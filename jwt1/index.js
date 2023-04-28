const express = require("express");
const { connectDb } = require("./mongo");

const port = 8080
const app = express();

app.use(express.json());

// app.use('')

app.listen(port, () => {
  console.log(`server running on port ${port}`);
  connectDb("mongodb://127.0.0.1:27017/jwtAuth")
});
