import './AllData.css';
import {useContext} from 'react';
import {GlobalContext} from '../GlobalContext';

export const AllData = () => {
  const {state} = useContext(GlobalContext);
  const {currentUserId, userSubmissions} = state;

  return (
      <div className="PageWrapper">
        {/*<div className="AllData CardStyling card mb-3">*/}
        {/*  <div className="card-header">User Activity</div>*/}
        {/*  <div className="card-body">*/}
        {/*    {*/}
        {/*        userSubmissions.length > 0 &&*/}
        {/*        <ul className="list-group">*/}
        {/*          {*/}
        {/*            userSubmissions.map((submission, idx) => {*/}
        {/*              return (*/}
        {/*                  <li key={idx} className="list-group-item">*/}
        {/*                    {submission.user} <strong>{submission.action === 'withdraw' ?*/}
        {/*                      'withdrew' :*/}
        {/*                      'deposited'}</strong> {submission.sum}*/}
        {/*                  </li>*/}
        {/*              );*/}
        {/*            })*/}
        {/*          }*/}
        {/*        </ul>*/}
        {/*    }*/}
        {/*    {*/}
        {/*        userSubmissions.length === 0 &&*/}
        {/*        <p>No activity yet</p>*/}
        {/*    }*/}
        {/*  </div>*/}
        {/*</div>*/}

        {/*<div className="AllData CardStyling card">*/}
        {/*  <div className="card-header">All Data</div>*/}
        {/*  <div className="card-body">*/}
        {/*    <div className="mb-3">*/}
        {/*      <h3>Users</h3>*/}
        {/*      <table className="table">*/}
        {/*        <thead>*/}
        {/*        <tr>*/}
        {/*          <th scope="col">Name</th>*/}
        {/*          <th scope="col">Email</th>*/}
        {/*          <th scope="col">Password</th>*/}
        {/*        </tr>*/}
        {/*        </thead>*/}
        {/*        <tbody>*/}
        {/*        {*/}
        {/*          users.map((user, idx) => {*/}
        {/*            return (*/}
        {/*                <tr key={idx}>*/}
        {/*                  <td>{user.name}</td>*/}
        {/*                  <td>{user.email}</td>*/}
        {/*                  <td>{user.password}</td>*/}
        {/*                </tr>*/}
        {/*            );*/}
        {/*          })*/}
        {/*        }*/}
        {/*        </tbody>*/}
        {/*      </table>*/}
        {/*    </div>*/}

        {/*    <div className="mb-3">*/}
        {/*      <h3>Current User ID:</h3>*/}
        {/*      <p>{currentUserId}</p>*/}
        {/*    </div>*/}

        {/*    <div className="mb-3">*/}
        {/*      <h3>Deposit Accounts</h3>*/}
        {/*      <table className="table">*/}
        {/*        <thead>*/}
        {/*        <tr>*/}
        {/*          <th scope="col">Username</th>*/}
        {/*          <th scope="col">Balance</th>*/}
        {/*        </tr>*/}
        {/*        </thead>*/}
        {/*        <tbody>*/}
        {/*        {*/}
        {/*          Object.keys(depositAccounts).map((accountUsername, idx) => {*/}
        {/*            return (*/}
        {/*                <tr key={idx}>*/}
        {/*                  <td>{accountUsername}</td>*/}
        {/*                  <td>{depositAccounts[accountUsername]}</td>*/}
        {/*                </tr>*/}
        {/*            );*/}
        {/*          })*/}
        {/*        }*/}
        {/*        </tbody>*/}
        {/*      </table>*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*</div>*/}
      </div>
  );
};
