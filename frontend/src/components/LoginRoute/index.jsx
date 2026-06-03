import "./index.css";
import { Component } from "react";
import {Redirect} from "react-router-dom"
import Cookies from "js-cookie";

class LoginRoute extends Component {
  state = {
    email: "",
    password: "",
    error: "",
  };

  changeEmailInput = (event) => {
    this.setState({ email: event.target.value });
  };

  changePasswordInput = (event) => {
    this.setState({ password: event.target.value });
  };

  submitLoginForm = async (event) => {
    event.preventDefault();
    const { history } = this.props;
    const { email, password } = this.state;
    if (!email || !password) {
      this.setState({ error: "All fields are required" });
      return;
    }

    const url = `${import.meta.env.VITE_API_URL}/api/auth/login`;
    const userDetails = { email, password };
    const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userDetails),
      }

      const response = await fetch(url, options);
      const data = await response.json();
      console.log(data, "login response");
      if (response.ok) {
        this.successfulLogin(data.token);
      } else if (data.message === "User not found") {
        history.replace("/signup");
      } else {
        this.setState({ error: data.message || "Invalid credentials" });
      }
  };

  successfulLogin = (jwtToken) => {
    const { history } = this.props;
    Cookies.set("token", jwtToken, { expires:7 });
    history.replace("/");
  };

  render() {
    const { error } = this.state;
    const token = Cookies.get("token");
    if (token) {
      const {history}=this.props;
      history.replace("/");
    }

    return (
      <div className="login-container">
        <form className="login-form" onSubmit={this.submitLoginForm}>
          <h1 className="heading">Welcome Back 👋</h1>
          <p className="sub-text">Login to continue</p>
          <div className="inputs-field-con">
          <label htmlFor="email" className="label">
            Email
          </label>
          <input
            type="text"
            placeholder="Enter your email"
            onChange={this.changeEmailInput}
            className="input-field"
            autoComplete="email"
          />
          <label htmlFor="password" className="label">
            Password
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            onChange={this.changePasswordInput}
            className="input-field"
            autoComplete="current-password"
          />
          </div>

          {error && <p className="error">{error}</p>}

          <button type="submit" className="btn">
            Login
          </button>

          <p className="bottom-text">
            Don't have an account? <button className="btn-alt" onClick={() => this.props.history.replace("/signup")}>SIGN UP</button>
          </p>
        </form>
      </div>
    );
  }
}

export default LoginRoute
 