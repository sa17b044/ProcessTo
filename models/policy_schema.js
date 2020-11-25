const { timeStamp } = require("console");
const mongoose = require("mongoose");
// The Schema allows you to define the fields
//stored in each document along with their validation requirements and default values.
// const logSchema2 = new mongoose.Schema(
//   {
//     cmd: {
//       type: String,
//       required: true,
//     },
//     log: {
//       type: String,
//       required: true,
//     },
//   },
//   { timestamps: true }
// );

const policy_schema = new mongoose.Schema({
  policy_name: {
    type: String,
    required: true,
  },
  inspection: {
    type: String,
    required: true,
  },
  detection: {
    type: String,
    required: true,
  },
  individual_addressing: {
    type: String,
    required: true,
  },
  SEARCH_REQUEST: {
    type: String,
    required: true,
  },
  DESCRIPTION_REQUEST: {
    type: String,
    required: true,
  },
  A_IndividualAddress_Write: {
    type: String,
    required: true,
  },
  A_IndividualAddress_Read: {
    type: String,
    required: true,
  },
  group_address_level: {
    type: String,
    required: true,
  },
  group_address_file: {
    type: String,
    required: true,
  },
  header: {
    type: String,
    required: true,
  },
  payload: {
    type: String,
    required: true,
  },
});

const Policy_Model = mongoose.model("Policy_Model",policy_schema);
module.exports = Policy_Model;

