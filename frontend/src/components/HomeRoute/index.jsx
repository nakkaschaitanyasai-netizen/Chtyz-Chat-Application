import NavbarRoute from "../NavbarRoute";
import { Component } from "react";
import Cookies from "js-cookie";
import UserProfile from "../UserProfile"
import "./index.css";
import ChatPage from "../ChatPage";
class HomeRoute extends Component{
    state={
        users:[],
        chatUser:null
    }
    componentDidMount=async()=>{
        const token=Cookies.get("token");
        const Url = `${import.meta.env.VITE_API_URL}/api/auth/`;
        const options={
            method:"GET",
            headers:{
                Authorization: `Bearer ${token}`,
                credentials:"include"
            }
        }
        const response= await fetch(Url,options);
        const data= await response.json();
        console.log(data,"home response")
        this.setState({users:data.users, loginUser:data.loginUser});
    }
    onUpdateChatUser=(id)=>{
        this.setState({chatUser:id})
    }
    render() {
        const {users,chatUser,loginUser}=this.state
        const  userdetails=users.filter(each=>each.id===chatUser)
        return (
            <div>
                <NavbarRoute />
                <div className="home-container">
                    <div className="users-container">
                        {users.map(each=>(<UserProfile values={each} key={each.id} onUpdateChatUser={this.onUpdateChatUser} />))}
                    </div>
                    {!chatUser?<div className="empty-view">
                        <video  autoPlay loop muted className="video">
                            <source src="https://v1.pinimg.com/videos/mc/720p/7e/6d/a6/7e6da68ae3dc155614d64afaf044dccd.mp4" type="video/mp4"/>
                        </video>
                        <p className="empty-text">Select a user to start chatting</p>
                    </div>:
                    <div className="chat-page">
                        <ChatPage userdetails={userdetails[0]} loggedInUser={loginUser} />
                    </div>}
                </div>
            </div>
    )
}}
export default HomeRoute;