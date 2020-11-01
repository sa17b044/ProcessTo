const { timeStamp } = require("console");
const mongoose = require("mongoose");
// The Schema allows you to define the fields
//stored in each document along with their validation requirements and default values.
const schema = mongoose.Schema;
const logSchema = new schema(
  {
    cmd: {
      type: String,
      required: true,
    },
    log: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
const Model = mongoose.model("Model", logSchema);
module.exports = Model;
