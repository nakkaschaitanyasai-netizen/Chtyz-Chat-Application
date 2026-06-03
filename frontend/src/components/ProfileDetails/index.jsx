import NavbarRoute from "../NavbarRoute";
import { Component } from "react";
import { Redirect } from "react-router-dom";
import Cookies from "js-cookie";

class ProfileDetails extends Component {
  state = { username: "", email: "", imgUrl:""};
  editProfile = () => {
    const {history}=this.props
    history.push("/profile-update")
  };
  componentDidMount = async () => {
    const token = Cookies.get("token");
    const data = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/profile-details`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const res = await data.json();
    if (res.ok) {
      this.setState({
        username: res.user.username,
        email: res.user.email,
        imgUrl:res.user.profilepic,
      });
    }
  };
  render() {
    const { username, email, imgUrl } = this.state;
    return (
      <div>
        <NavbarRoute />
        <div className="profile-bg">
          <div className="profile-container">
            <img src={imgUrl} className="profile-img" alt="Profile" />

            <h1 className="profile-name">{username}</h1>
            <p className="profile-email">{email}</p>
            <button className="profile-edit-btn" onClick={this.editProfile}>
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    );
  }
}
export default ProfileDetails;
