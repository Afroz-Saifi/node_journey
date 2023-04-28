const jwt = require("jsonwebtoken");
require("dotenv").config();
const { User } = require("../models/User.model");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const authentication = async (req, res, next) => {
  try {
    const { access_token } = req?.cookies;
    const { email, role } = jwt.verify(access_token, process.env.token);
    const is_user = await User.findOne({ email });
    if (!is_user) {
      return res.status(400).json({
        error: {
          status: "400 Bad request",
          msg: "You are not authorized for this route",
        },
      });
    }
    let user = { email, role };
    req.user = user;
    next();
  } catch (error) {
    if (error.message == "jwt expired") {
      try {
        const response = await fetch("http://localhost:4500/user/refresh", {
          headers: {
            "Content-type": "application/json",
            Authorization: req.cookies.refresh_token,
          },
        });
        const ans = await response.json();
        res.cookie("access_token", ans.new_token);
        res.redirect("/user/profile")
      } catch (error) {
        return res.json({ msg: "cannot get new token", error });
      }
    } else {
      return res.json({ msg: "please login kro", error });
    }
  }
};

module.exports = { authentication };
