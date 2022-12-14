import {CreateAccount} from './CreateAccount';
import {Home} from './Home';
import {Deposit} from './Deposit';
import {Withdraw} from './Withdraw';
import {AllData} from './AllData';
import {Login} from './Login';

export const pages = [
  {name: 'Create Account', url: 'create-account', element: <CreateAccount/>, description: 'Create your account', whenSignedIn: false},
  {name: 'Login', url: 'login', element: <Login/>, description: 'Log in to your account', whenSignedIn: false},
  {name: 'Home', url: '/', element: <Home/>, description: 'Home page'},
  {name: 'Deposit', url: 'deposit', element: <Deposit/>, description: 'Deposit money'},
  {name: 'Withdraw', url: 'withdraw', element: <Withdraw/>, description: 'Withdraw money'},
  // {
  //   name: 'All Data',
  //   url: 'all-data',
  //   element: <AllData/>,
  //   description: 'See your data in one place'
  // }
];
