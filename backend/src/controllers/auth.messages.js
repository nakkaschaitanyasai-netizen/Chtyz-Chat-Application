import { getDB } from "../db/db.js";
import cloudinary from "../db/cloudnary.js";

import { io, users } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
  try {
    const { receiver_id, message } = req.body;

    const sender_id = req.user.id;

    const db = getDB();
    await db.run(
      `
        INSERT INTO messages
        (
          sender_id,
          receiver_id,
          message
        )
        VALUES (?, ?, ?)
      `,
      [sender_id, receiver_id, message],
    );

    const receiverSocketId = users[receiver_id];
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("receive_message", {
        sender_id,
        receiver_id,
        message,
      });
    }

    res.status(201).json({
      message: "Message sent successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { receiver_id } = req.params;
    const sender_id = req.user.id;
    const db = getDB();
    console.log("Receiver ID:", receiver_id);
    console.log("Sender ID:", sender_id);
    const messages = await db.all(
      "SELECT * FROM messages WHERE (sender_id = ? AND receiver_id = ?) OR (sender_id = ? AND receiver_id = ?)",
      [sender_id, receiver_id, receiver_id, sender_id],
    );
    console.log("Fetched Messages:", messages);
    res.json({ messages });
  } catch (error) {
    res.status(500).json({ "error at get Message": error.message });
  }
};
