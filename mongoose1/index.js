const express = require("express");
const { connection } = require("./connection");
const { Model } = require("./model/user");
const { logsUpdater } = require("./middleware");
const {handleGetAllUsers} = require('./routes/user')

const port = 3000;
const app = express();
app.use(express.json());
app.use(logsUpdater("logs.txt"))

app.use('/', handleGetAllUsers)

app.get("/users", async (req, res) => {
  const query = req.query;
  const data = await Model.find(query);
  res.status(200).json(data);
});

app.post("/add", async (req, res) => {
  const data = req.body;
  try {
    const userData = new Model(data);
    await userData.save();
    res.status(201).json({ msg: "added successfully" });
  } catch (error) {
    res.status(400).json({ msg: "wrong credentials" });
  }
});

app.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const data = await Model.findByIdAndDelete({ _id: id });
    res.json(data);
  } catch (error) {
    res.status(400).json({ msg: error.msg });
  }
});

app.patch("/update/:id", async (req, res) => {
  const id = req.params.id;
  const upload = req.body;
  try {
    const data = await Model.findByIdAndUpdate({ _id: id }, upload);
    res.json(data);
  } catch (error) {
    res.status(400).json({ msg: error.msg });
  }
});

app.listen(port, async () => {
  try {
    await connection("mongodb://127.0.0.1:27017/mongooseApp");
    console.log("connected to mongo");
  } catch (error) {
    console.log(error);
  }
  console.log(`server running on http:localhost:${port}`);
});
