import { Link, withRouter } from "react-router-dom";
import { Component } from "react";
import Cookie from "js-cookie";
import "./index.css";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
class NavbarRoute extends Component {
  onLogout = () => {
    Cookie.remove("token");
    const { history } = this.props;
    history.replace("/login");
  };
  render() {
    return (
      <nav className="navbar">
        <img
          src="https://i.pinimg.com/1200x/1e/59/66/1e5966ab5186ed5b9e923fff7fdc297a.jpg"
          className="logo"
        />
        <div className="navbar-container">
          <ul className="ul-list">
            <Link to="/" className="navbar-logo">
              <HomeRoundedIcon className="icons-size" />
            </Link>
            <Link to="/profile-details">
              <AccountCircleRoundedIcon className="icons-size" />
            </Link>
            <li>
              <button className="nav-items" onClick={this.onLogout}>
                <LogoutRoundedIcon className="icons-size" />
              </button>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
export default withRouter(NavbarRoute);
