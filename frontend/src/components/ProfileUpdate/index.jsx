import Cookies from "js-cookie";
import { Component } from "react";
import NavbarRoute from "../NavbarRoute";
import CameraAltRoundedIcon from "@mui/icons-material/CameraAltRounded";
import "./index.css";

class ProfileUpdate extends Component {
  state = {
    img: false,
    imgUrl: null,
    username: "",
    email: "",
  };
  updateState = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const Url = "https://api.cloudinary.com/v1_1/dcdtpe8rh/image/upload";
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "chat_app");
    data.append("cloud_name", "dcdtpe8rh");
    const options = {
      method: "POST",
      body: data,
    };
    const response = await fetch(Url, options);
    const imageFileUrl = await response.json();
    this.setState({ imgUrl: imageFileUrl.url, img: true });
  };
  componentDidMount = async () => {
    const token = Cookies.get("token");
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const data = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/profile-details`, options);
    const response = await data.json();
    const admin = response.user;
    this.setState({
      username: admin.username,
      email: admin.email,
      imgUrl: admin.profilepic,
    });
  };
  updateProfile = async () => {
    const { imgUrl } = this.state;
    console.log(imgUrl);
    const token = Cookies.get("token");
    const Url = `${import.meta.env.VITE_API_URL}/api/auth/profile-update`;
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ profilepic: imgUrl }),
    };
    const data = await fetch(Url, options);
    const response = await data.json();
    console.log(response);
  };
  render() {
    const { img, imgUrl, username, email } = this.state;
    return (
      <div>
        <NavbarRoute />
        <div className="profile-bg">
          <div className="profile-container">
            <img src={imgUrl} className="profile-img" alt="Profile" />
            <label htmlFor="file-upload" className="camera-label camera">
              <CameraAltRoundedIcon />
              <h1 className="upload-img">Upload Image</h1>
            </label>
            <input
              id="file-upload"
              type="file"
              className="camera-input"
              onChange={this.updateState}
              hidden
            />
            <h1 className="profile-name">{username}</h1>
            <p className="profile-email">{email}</p>
            {img ? (
              <button className="profile-edit-btn" onClick={this.updateProfile}>
                Edit Profile
              </button>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileUpdate;
