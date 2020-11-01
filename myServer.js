const express = require("express");
const cp = require("child_process");
const fs = require("fs");
const app = express();
const mongoose = require("mongoose");
const Model = require("./models/schema");
const { timeStamp } = require("console");
const dbURL = "mongodb://127.0.0.1:27017/test";
mongoose
  .connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((data) => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log("Error" + err);
  });

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index", { title: "Home" });
});
app.get("/command", (req, res) => {
  res.render("command", { title: "Command" });
});
app.post("/add_log", (req, res) => {
  let cmd = req.body.cmd;
  cp.exec(cmd, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    add_log_db(res,cmd,stdout);
  });
});
app.get("/logs", (req, res) => {
  Model.find()
    .sort({ createdAt: -1 }).limit(1)
    .then((data) => {
      res.render("logs", { title: "Logs", data : data[0] });
    })
    .catch((err) => {
      console.log(err);
    });
});
app.use((req, res) => {
  res.status(404).render("404", { title: "Error" });
});
const add_log_db= (res,cmd,log) =>{
  const model = new Model({
    cmd : cmd,
    log : log
  });
    model
    .save()
    .then((data) => {
      // res.send(data);
      res.redirect('/logs');
    })
    .catch((err) => {
      console.log(err);
    });
}
