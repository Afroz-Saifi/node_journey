const express = require('express')
const { Model } = require("../model/user");

const router = express.Router()

const handleGetAllUsers = async (req, res) => {
  const data = await Model.find();
  return res.status(200).json(data);
};

module.exports = {
    handleGetAllUsers
}