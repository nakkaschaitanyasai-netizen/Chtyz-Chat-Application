import { Switch, Route, Redirect } from "react-router-dom";
import "./index.css";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./components/HomeRoute";
import Login from "./components/LoginRoute";
import Signup from "./components/Signup";
import NotFound from "./components/NotFound";
import ProfileUpdate from "./components/ProfileUpdate"; 
import ProfileDetails from "./components/ProfileDetails"; 
function App() {
  return (
    <div>
      <Switch> 
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
        <ProtectedRoute path="/" exact component={Home} />
        <ProtectedRoute path="/profile-details" component={ProfileDetails}/>
        <ProtectedRoute path="/profile-update" component={ProfileUpdate}/>
        <Route path="/not-found" component={NotFound} />
        <Redirect to="/not-found"/>
      </Switch>
    </div>
  );
}

export default App;
