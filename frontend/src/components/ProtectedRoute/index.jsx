import Cookies from "js-cookie";
import { Redirect,Route } from "react-router-dom";
const ProtectedRoute = (props) => {
  const token = Cookies.get("token");
  if (token) {
    return <Route {...props} />;
  }
  return <Redirect to="/login" />;
};
export default ProtectedRoute;