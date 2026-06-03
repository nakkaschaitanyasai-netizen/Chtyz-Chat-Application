import { Server } from "socket.io";

export const users = {};

let io;

export const initializeSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: ["https://chtyz-chat-application.vercel.app","http://localhost:5173"],
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("User Connected:", socket.id);

    socket.on("join", (userId) => {
      users[userId] = socket.id;

      console.log(users);
    });

    socket.on("disconnect", () => {
      console.log("User Disconnected");

      for (let key in users) {
        if (users[key] === socket.id) {
          delete users[key];
        }
      }
    });
  });

  return io;
};

export { io };