import "./App.css";
import { Navbar } from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import { pages } from "./pages/page-definitions";
import { GlobalContextProvider } from "./GlobalContext";
import { Toast } from "./components/Toast";

function App() {
  return (
    <GlobalContextProvider>
      <div className="AppShell">
        <Navbar></Navbar>
        <Routes>
          {pages.map(({ url, element }) => {
            return <Route key={url} path={url} element={element} />;
          })}
        </Routes>
      </div>
    </GlobalContextProvider>
  );
}

export default App;
