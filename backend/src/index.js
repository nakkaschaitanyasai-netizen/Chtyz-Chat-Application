import express from "express";
import http from "http";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/auth.route.js";
import { connectDB } from "./db/db.js";
import cookieParser from "cookie-parser";
import "dotenv/config";

import { initializeSocket } from "./socket/socket.js";

const app = express();

app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 5000;

app.use("/api/auth", authRoutes);
app.use("/api", messageRoutes);

const server = http.createServer(app);

initializeSocket(server);

const servestart = async () => {
  try {
    await connectDB();

    server.listen(PORT, () => {
      console.log(`Server running on ${PORT}`);
    });
  } catch (error) {
    console.error("Database Error:", error);
  }
};

servestart();

export default app;