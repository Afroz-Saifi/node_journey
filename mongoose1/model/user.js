const mongoose = require("mongoose");

const layout = mongoose.Schema({
  name: String,
  age: Number,
  is_married: Boolean,
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

const Model = mongoose.model("testing", layout);

module.exports = { Model };
