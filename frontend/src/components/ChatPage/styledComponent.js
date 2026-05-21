import styled from "styled-components";
export const ChatContainer = styled.div`
  height: 90vh;
  display: flex;
  flex-direction: column;
  background: #f5f7fb;
  width: 100%;
`;

export  const ChatHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  background: white;
  border-bottom: 1px solid #ddd;
`;

export const ProfilePic = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
`;

export const Username = styled.h3`
  font-size: 18px;
  color: #333;
`;

export const ChatBody = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;

export const Message = styled.div`
  max-width: 60%;
  padding: 10px 15px;
  margin: 6px 0;
  border-radius: 15px;
  color: white;
  font-size: 14px;
  align-self: ${(props) => (props.type === "me" ? "flex-end" : "flex-start")};
  background: ${(props) =>
    props.type === "me"
      ? "linear-gradient(135deg, #ff7e5f, #feb47b)"
      : "linear-gradient(135deg, #6a11cb, #2575fc)"};
`;

export const ChatInputContainer = styled.div`
  display: flex;
  padding: 10px;
  background: white;
  border-top: 1px solid:#333;
`;

export const Input = styled.input`
  flex: 1;
  color: #333;
  padding: 10px;
  border-radius: 20px;
  border: 1px solid #ccc;
  outline: none;
`;

export const Button = styled.button`
  margin-left: 10px;
  padding: 10px 15px;
  border: none;
  border-radius: 20px;
  background: #2575fc;
  color: white;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

