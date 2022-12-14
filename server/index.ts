import bcrypt from "bcrypt";
import bodyParser from "body-parser";
import MongoDBStore from "connect-mongodb-session";
import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Request, Response } from "express";
import session from "express-session";
import { MongoClient } from "mongodb";
import { v4 as uuid } from "uuid";
import { sessionSecret } from "./secret";

declare module "express-session" {
  interface SessionData {
    user: string;
  }
}

const mongoBaseUrl = process?.env?.MONGODB_URI ?? "mongodb://127.0.0.1:27017/";
const dbName = "db";
const mongoOptions = "?authSource=admin";

const client = new MongoClient(`${mongoBaseUrl}${mongoOptions}`);

const app = express();
const port = 3001;

interface User {
  _id: string;
  email: string;
  name: string;
  password: string;
  balance: number;
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cookieParser());

app.use(
  cors({
    origin: process?.env?.CLIENT_HOST ?? "http://localhost:3000",
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
    credentials: true,
  })
);

const mongoStore = MongoDBStore(session);
const store = new mongoStore({
  uri: `${mongoBaseUrl}${mongoOptions}`,
  collection: "userSessions",
});

const maxCookieAge = 1000 * 60 * 60 * 24 * 7; // 1 week
app.use(
  session({
    store,
    name: "SESSION",
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: maxCookieAge,
      sameSite: false,
      secure: false,
    },
    secret: sessionSecret,
  })
);

console.log("connecting to db");

async function main() {
  console.log("thinking...");

  await client.connect();
  console.log("Connected successfully to server");

  const db = client.db(dbName);

  const getUser = async (req: Request, res: Response) => {
    if (!req.session.user) {
      res.sendStatus(403);
    }

    const user = await db
      .collection("users")
      .find({
        _id: req.session.user,
      })
      .toArray();

    res.send(JSON.stringify(user[0]));
  };

  const initSession = (user: User, req: Request, res: Response) => {
    store.set(
      uuid(),
      {
        user: user._id,
        cookie: {
          originalMaxAge: maxCookieAge,
        },
      },
      (err) => {
        req.session.user = user._id;
        if (err) {
          res.sendStatus(500);
          return;
        }

        res.send(JSON.stringify(user));
      }
    );
  };

  app.post("/signIn", async (req, res) => {
    const user = await db
      .collection("users")
      .find<User>({
        email: req.body.email,
      })
      .toArray();

    if (user[0]) {
      bcrypt.compare(req.body.password, user[0].password, async (err, success) => {
        if (err) {
          res.sendStatus(500);
          return;
        }

        if (!success) {
          console.log("epic fail", user[0], req.body.password);
          res.sendStatus(403);
          return;
        }

        initSession(user[0], req, res);
      });
    } else {
      res.sendStatus(403);
    }
  });

  app.post("/addUser", (req, res) => {
    bcrypt.hash(req.body.password, 10, async (err, encrypted) => {
      if (err) {
        console.log("bcrypt err", err, req.body.password, req.body);
        res.sendStatus(500);
        return;
      }

      const doc = {
        email: req.body.email,
        name: req.body.name,
        password: encrypted,
        balance: 0,
      };
      const existing = await db
        .collection("users")
        .find({
          email: req.body.email,
        })
        .toArray();

      if (existing.length) {
        res.sendStatus(403);
        return;
      }

      db.collection("users")
        .insertOne(doc)
        .then((e) => {
          initSession(
            {
              ...doc,
              _id: e.insertedId.toString(),
            },
            req,
            res
          );
        });
    });
  });

  const modifyBalance = (balance: number, req: Request, res: Response) => {
    if (req.session.user) {
      db.collection("users")
        .updateOne(
          {
            _id: req.session.user,
          },
          {
            $inc: {
              balance,
            } as Partial<User>,
          }
        )
        .then(async () => {
          await getUser(req, res);
        });
    }
  };

  app.post("/deposit", (req, res) => {
    modifyBalance(req.body.sum, req, res);
  });

  app.post("/withdraw", (req, res) => {
    modifyBalance(-req.body.sum, req, res);
  });

  app.get("/getUser", async (req, res) => {
    await getUser(req, res);
  });

  app.post("/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        res.sendStatus(500);
        return;
      }

      res.send("{}");
    });
  });

  app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });

  return "done.";
}

main();
