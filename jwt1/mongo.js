const mongoose = require("mongoose");

const connectDb = async (ulr) => {
  await mongoose.connect(url);
};

module.exports = { connectDb };
