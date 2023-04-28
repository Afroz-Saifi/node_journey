const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const user_schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, trim: true },
    password: { type: String, required: true },
    role: {
      type: String,
      required: true,
      enum: ["Super Admin", "Admin", "User"],
      default: "User",
    },
  },
  { versionKey: false, timestamps: true }
);

user_schema.pre("save", async function (next) {
  try {
    const crypt_pass = await bcrypt.hash(this.password, 8);
    this.password = crypt_pass;
    next();
  } catch (error) {
    next(erro);
  }
});

const User = mongoose.model("user", user_schema);

module.exports = { User };
