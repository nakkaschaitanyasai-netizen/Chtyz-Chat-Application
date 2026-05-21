import bcrypt from "bcryptjs";
import {getDB} from "../db/db.js";
import jwt from "jsonwebtoken";
import cloudinary from "../db/cloudnary.js";

export const signup = async (req, res) => {
  try {
    const db = getDB();
    const { username, email, password } = req.body;

    if (!username || !email || !password) {

      return res.status(400).json({ ok: false, error: "All fields are required at backend" });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const db_Query =
      "INSERT INTO demoUsers ( username, email, password) VALUES (?, ?, ?)";

    const result = await db.run(db_Query, [username, email, hashedPassword]);
    
    res.status(201).json({ ok: true, message: "User registered successfully", userId: result.lastID });

  } catch (error) {
    res.status(500).json({
      ok: false,
      error: error.message || "User registration failed"
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const db = getDB();
    const user = await db.get(
      "SELECT * FROM demoUsers WHERE email = ?",
      [email]
    );
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    const isMatch = bcrypt.compareSync(password, user.password);
    
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }
    const payload={ 
      id:user.id,
      email: user.email
    };
    const token = jwt.sign(payload , process.env.JWT_SECRET, {
      expiresIn: "7d"
    });

    res.status(200).json({ok: true, message: "Login successful", token});

  } catch (error) {
    res.status(500).json({ ok: false, error: "Login failed" });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ok: true, message: "Logout successful" });

};

export const profileUpdate = async (req, res) => {
  try {
    const id = req.user.id 
    const {profilepic}=req.body
    console.log(profilepic,"backend")
    console.log(id)
    const db = getDB();
    const user = await db.get("SELECT * FROM demoUsers WHERE id = ?", [id]);
    if (user==undefined){
      return res.status(404).json({
        ok: false,
        error: "User not found"
      })
    }

    const profilepicUrl=profilepic || user.profilepic
    const query = "UPDATE demoUsers SET profilepic = ? WHERE id = ?";
    await db.run(query, [profilepicUrl, id]);
    
    res.json({ ok: true, message: "Profile updated successfully" });
  }
   catch(error){
     res.send({ ok: false, error: error.message || "profile update failed" });
   }
}

export const home = async (req, res) => {
  try{
  const db=getDB();
  const Id=req.user.id
  const users= await db.all("SELECT id, username, email, profilepic FROM demoUsers WHERE id != ?", [Id])
  const loginUser= await db.get("SELECT id, username, email, profilepic FROM demoUsers WHERE id = ?", [Id])
  res.status(200).json({ ok: true, users, loginUser})
  }
  catch(error){
    res.status(500).json({ ok: false, error: "Failed to fetch user data" });
  }
}

export const getProfile = async (req, res) => {
  try {
    const id = req.user.id 
    const db = getDB()

    const user = await db.get(
      "SELECT username, email, profilepic FROM demoUsers WHERE id = ?",
      [id]
    )

    if (!user) {
      return res.status(404).json({
        ok: false,
        error: "User not found"
      })
    }

    return res.json({
      ok: true,
      user
    })

  } catch (error) {
    return res.status(500).json({
      ok: false,
      error: error.message
    })
  }
}