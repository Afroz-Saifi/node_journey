const express = require("express");
const { User } = require("../models/User.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { authentication } = require("../middleware/authentication");
const { authorization } = require("../middleware/authorization");

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { email, password, name, role } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create a new user
    const user = new User(req.body);
    await user.save();

    res.json({ message: "User created successfully" });
  } catch (error) {
    return res.json({ error });
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Find the user by username
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Compare the password
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // create access token
    const payload = {
      email: user.email,
      role: user.role,
    };
    const access_token = jwt.sign(payload, process.env.token, {
      expiresIn: "20s",
    });
    // create refresh token
    const refresh_token = jwt.sign(payload, process.env.refresh_token, {
      expiresIn: "30s",
    });

    res.cookie("access_token", access_token);
    res.cookie("refresh_token", refresh_token);
    // res.clearCookie("access_token")
    // res.clearCookie("refresh_token")

    res.json({
      msg: "login successfull",
      tokens: { access_token, refresh_token },
    });
  } catch (error) {
    console.log(error);
  }
});

router.get("/profile", authentication, async (req, res) => {
  try {
    const { email } = req.user;
    const profile = await User.findOne({ email });
    return res.json({ profile });
  } catch (error) {}
});

router.get(
  "/todo",
  authentication,
  authorization(["Super Admin"]),
  async (req, res) => {
    try {
      const data = await User.find();
      return res.json({ msg: "all users", data });
    } catch (err) {
      return res.json({
        error: {
          status: "500 server error",
          msg: "not able to find the users",
          error: err,
        },
      });
    }
  }
);

router.get("/refresh", async (req, res) => {
  try {
    const refresh_token = req.cookies.refresh_token || req.headers.authorization;
    const decoded = jwt.verify(refresh_token, process.env.refresh_token);
    console.log("decoded");
    if (!decoded) throw error;
    const { email, role } = decoded;
    const payload = { email, role };
    const new_access_token = jwt.sign(payload, process.env.token, {
      expiresIn: "20s",
    });
    res.cookie("access_token", new_access_token);
    res.json({ msg: "new token has genereted", new_token: new_access_token });
  } catch (error) {
    return res.json({ msg: "please login", error });
  }
});

module.exports = { router };
