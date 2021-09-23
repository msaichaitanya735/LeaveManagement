import HomePage from "./Components/HomePage"
import Admin from './Components/AdminPage'
import User from './Components/User'
import { Provider } from "react-redux";
import { store } from "./store";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';
import PrivateRoute from "./Components/PrivateRoute";
import AdminProtectRoute from "./Components/AdminProtectRoute";
import Leaveform from "./Components/Leaveform";
import Admintable from "./Components/Admintable";
import AdminRequestView from "./Components/AdminRequestView";
import Adminapprovedtable from "./Components/Adminapprovedtable";
import Myleaves from "./Components/Myleaves";


function App() {
  return (
    <div className="App">
    <Provider store={store}>
    <Router>
    <Route exact path="/" component={HomePage}/>
    <PrivateRoute exact path="/user" component={User}/>
    <PrivateRoute exact path="/user/leave" component={Leaveform}/>
    <PrivateRoute exact path="/user/myleaves" component={Myleaves}/>
    <AdminProtectRoute exact path="/Admin" component={Admin}/>
    <AdminProtectRoute exact path="/admin/pendingrequest" component={Admintable}/>
    <AdminProtectRoute exact path="/admin/approvedrequest" component={Adminapprovedtable}/>
    <AdminProtectRoute exact path="/admin/requestview" component={AdminRequestView}/>
    </Router>
    </Provider>
    </div>
  );
}

export default App;
