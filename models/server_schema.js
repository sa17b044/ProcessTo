const { timeStamp } = require("console");
const mongoose = require("mongoose");

const server_schema = new mongoose.Schema({
  src_ip: {
    type: String,
    required: true,
  },
  src_port: {
    type: String,
    required: true,
  },
  dst_ip: {
    type: String,
    required: true,
  },
  dst_port: {
    type: String,
    required: true,
  },
  policy: {
    type: String,
    required: true,
  },
  logKNXnetip: {
    type: String,
    required: true,
  },
  logToFile: {
    type: String,
    required: true,
  },
});

const Server_Model = mongoose.model("Server_Model", server_schema);
module.exports = Server_Model;
