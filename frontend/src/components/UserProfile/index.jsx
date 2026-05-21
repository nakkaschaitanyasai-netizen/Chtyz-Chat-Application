import './index.css'
const UserProfile=(Props)=>{
    const {values,onUpdateChatUser}=Props
    const{username,profilepic}=values
    const updateof=()=>{
        onUpdateChatUser(values.id)
    }
    return(
        <>
        <div className="user-card" onClick={updateof}>
            <img src={!profilepic?"https://i.pinimg.com/736x/2d/73/52/2d7352b99a2437c47c419692d047bb5f.jpg":profilepic} className="profile-pic"/>
            <div className="names-con">
                <p className='name'>{username}</p>
                <p className='indicator'>Tap here to open Chat</p>
            </div>
        </div>
        <hr className='line'/>
        </>
    )
}
export default UserProfile