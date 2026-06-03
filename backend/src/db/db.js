import sqlite3 from "sqlite3";
import { open } from "sqlite";
import path from "path";
let db;
const __dirname = path.resolve();
const dbPath = path.join(__dirname, "chat.db");

export const connectDB = async () => {
    try {
        db = await open({
            filename: dbPath,
            driver: sqlite3.Database
        });
        await db.exec(`
          CREATE TABLE IF NOT EXISTS demoUsers (
            id integer PRIMARY KEY AUTOINCREMENT,
            username TEXT,
            email TEXT UNIQUE,
            password TEXT,
            profilepic TEXT
          )
        `);
        const users = await db.all("drop table if exists demoUsers");
        console.log("Connected to SQLite database");
        console.log("Users:", users);

        await db.exec(`
            CREATE TABLE IF NOT EXISTS messages (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            sender_id int,
            receiver_id int,
            message TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );`);
        const msgs=await db.run("drop table if exists messages");
        console.log("Connected to SQLite database");
        console.log("Messages:", msgs);

        return db;
    } catch (error) {
        console.error("Error connecting to SQLite database:", error.message || error);
        process.exit(1);
    }
}; 

export const getDB = () => {
    if (!db) throw new Error('Database not initialized');
    return db;
};


export default db;