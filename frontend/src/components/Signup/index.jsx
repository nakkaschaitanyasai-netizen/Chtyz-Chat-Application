import React, { Component } from "react";
import Cookies from "js-cookie";
import "./index.css";

class Signup extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    error: "",
    success: ""
  };
  onSuccessfullSignup = async () => {
    const { username, email, password } = this.state;
    const url = `${import.meta.env.VITE_API_URL}/api/auth/signup`;
    const userDetails = { username, email, password };
    const options={
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify(userDetails)
    };

    const response = await fetch(url,options);
    const data = await response.json();
    console.log("Signup response:", data);
    if (response.ok) {
      console.log("Signup successful:", data);
      this.setState({ success: "Signup successful Click Login and continue", error: "",email:"",password:"",username:""  });
    } else {
      const errorMessage = data.message || "Signup failed. Please try again.";
      this.setState({ error: errorMessage,});
    }
  };
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { username, email, password } = this.state;
    if (!username || !email || !password) {
      this.setState({ error: "All fields are required", success: "" });
      return;
    }
    this.onSuccessfullSignup();
  };
  aftersignup=()=>{
    return(
      <div style={{ textAlign: "center", height: "50%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",borderRadius:"10px" ,boxShadow:"0 4px 10px 6px",background:"#ffffff",padding:"30px",maxWidth:"300px",margin:"0 auto"}}>
        <h2 style={{ fontSize: "20px",color:"#4caf50" }}>Signup successful!</h2>
        <p style={{ fontSize: "14px",color:"#555" }}>Click the button below to login and continue.</p>
        <button className="signup-button" onClick={() => this.props.history.replace("/login")}>Login</button>
      </div>
    )
  }

  render() {
    const { username, email, password, error, success } = this.state;

    return (
      <div className="container">
        {!success ? (
          <form className="signup-form" onSubmit={this.handleSubmit}>
            <h2 className="signup-heading" style={{ fontSize: "23px" }}>Signup</h2>
            <p  className="signup-heading" style={{ fontSize: "13px",textAlign: "center" }}>Create an account to get started</p>
            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}

          <input
            type="text"
            name="username"
            placeholder="Username"
            value={username}
            onChange={this.handleChange}
            className="input-field"
            autoComplete="username"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={this.handleChange}
            className="input-field"
            autoComplete="email"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            autoComplete="current-password"
            value={password}
            onChange={this.handleChange}
            className="input-field"
          />

          <button type="submit" className="signup-button">Sign Up</button>
          <p className="bottom-text">
            If you have an account? <button className="btn-alt"onClick={() => this.props.history.replace("/login")}>LOGIN</button>
          </p>
            </form>
        ) : (
          this.aftersignup()
        )}
      </div>
    );
  
  }
}
export default Signup;
