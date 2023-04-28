const express = require("express");
const mongoose = require("mongoose");
const { router } = require("./routes/router.route");
const cookie_parser = require("cookie-parser");

const app = express();

app.use(express.json());
app.use(cookie_parser());
app.use("/user", router);

app.listen(4500, async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/rbac");
    console.log("connected to DB successfully");
  } catch (err) {
    console.log("error connecting to DB");
    console.log(err);
  }
  console.log(`listening on port 4500`);
});
