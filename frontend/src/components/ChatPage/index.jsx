import {
  ChatContainer,
  ChatHeader,
  ProfilePic,
  Username,
  ChatBody,
  Message,
  ChatInputContainer,
  Input,
  Button,
} from "./styledComponent.js";

import { Component } from "react";

import Cookies from "js-cookie";

import socket from "../../socket/socket";

class ChatPage extends Component {
  state = {
    messages: [],
    userinput: "",
  };

  fetchMessages = async () => {
    const { userdetails } = this.props;

    const { id } = userdetails;

    const token = Cookies.get("token");

    const options = {
      method: "GET",

      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    console.log(this.props.loggedInUser.id, "loggedinuser");

    const response = await fetch(`/api/auth/messages/${id}`, options);

    const data = await response.json();

    const formatedData = data.messages.map((each) => ({
      id: each.id,

      text: each.message,

      sender: each.sender_id === this.props.loggedInUser.id ? "me" : "friend",
    }));

    this.setState({
      messages: formatedData,
    });
  };
  componentDidMount() {
    if (this.props.loggedInUser?.id) {
      socket.emit("join", this.props.loggedInUser.id);

      console.log("JOINED:", this.props.loggedInUser.id);
    }

    if (this.props.userdetails?.id) {
      this.setState({
        presentChatUser: this.props.userdetails.id,
      });

      this.fetchMessages();
    }

    socket.on("receive_message", (data) => {
      const newMsg = {
        id: Date.now(),
        text: data.message,
        sender: data.sender_id === this.props.loggedInUser.id ? "me" : "friend",
      };

      this.setState((prev) => ({
        messages: [...prev.messages, newMsg],
      }));
    });
  }
  scrollToBottom = () => {
  if (this.chatBody) {
    this.chatBody.scrollTop = this.chatBody.scrollHeight;
  }
};

  componentDidUpdate(prevProps) {
    if (prevProps.messages?.length !== this.state.messages.length) {
      this.scrollToBottom();
    }
    if (prevProps.loggedInUser?.id !== this.props.loggedInUser?.id) {
      socket.emit("join", this.props.loggedInUser.id);

      console.log("REJOIN:", this.props.loggedInUser.id);
    }

    if (prevProps.userdetails?.id !== this.props.userdetails?.id) {
      this.setState({
        presentChatUser: this.props.userdetails.id,
      });

      this.fetchMessages();
    }
  }
  componentWillUnmount() {
    socket.off("receive_message");
  }

  onChangeInput = (e) => {
    this.setState({
      userinput: e.target.value,
    });
  };

  sendMessage = async () => {
    const { userinput } = this.state;

    if (userinput.trim() === "") return;

    const receiver_details = {
      receiver_id: this.props.userdetails.id,

      message: userinput,
    };

    const token = Cookies.get("token");

    const options = {
      method: "POST",

      headers: {
        "Content-Type": "application/json",

        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify(receiver_details),
    };

    const response = await fetch("/api/auth/messages", options);

    const data = await response.json();

    console.log(data, "leave");

    socket.emit("send_message", {
      message: userinput,
      sender_id: this.props.loggedInUser.id,
      receiver_id: this.props.userdetails.id,
    });
    const newMsg = {
      id: Date.now(),
      text: this.state.userinput,
      sender: "me",
    };

    this.setState((prev) => ({
      messages: [...prev.messages, newMsg],
      userinput: "",
    }));
  };

  handleKeyDown = (event) => {
    if (event.key === "Enter") {
      this.sendMessage();
    }
  };

  render() {
    const { userinput, messages } = this.state;

    const { userdetails } = this.props;

    return (
      <ChatContainer>
        <ChatHeader>
          <ProfilePic
            src={
              !userdetails.profilepic
                ? "https://i.pinimg.com/736x/2d/73/52/2d7352b99a2437c47c419692d047bb5f.jpg"
                : userdetails.profilepic
            }
            alt="profilepic"
          />

          <Username>{userdetails.username}</Username>
        </ChatHeader>

        <ChatBody  ref={(el) => (this.chatBody = el)}>
          {messages.map((msg) => (
            <Message key={msg.id} type={msg.sender === "me" ? "me" : "friend"}>
              {msg.text}
            </Message>
          ))}
        </ChatBody>

        <ChatInputContainer>
          <Input
            type="text"
            value={userinput}
            onChange={this.onChangeInput}
            placeholder="Type a Msg..."
            onKeyDown={this.handleKeyDown}
          />

          <Button onClick={this.sendMessage}>Send</Button>
        </ChatInputContainer>
      </ChatContainer>
    );
  }
}

export default ChatPage;
