const express = require("express");
const cp = require("child_process");
const multer = require("multer");
const path = require("path");

//set storage engine
const storage = multer.diskStorage({
  destination: "./public/upload/",
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
// Init upload
const upload = multer({ storage: storage }).single("file");

//Init app
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
// EJS
app.set("view engine", "ejs");
// Public Folder
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
    add_log_db(res, cmd, stdout);
  });
});
app.get("/upload", (req, res) => {
  res.render("upload", { title: "upload" });
});
app.post("/upload", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.render("/upload", { msg: err });
    } else {
      console.log(req.file);
      res.redirect("/logs");
    }
  });
});

app.get("/logs", (req, res) => {
  Model.find()
    .sort({ createdAt: -1 })
    .limit(1)
    .then((data) => {
      res.render("logs", { title: "Logs", data: data[0] });
    })
    .catch((err) => {
      console.log(err);
    });
});
app.use((req, res) => {
  res.status(404).render("404", { title: "Error" });
});
const add_log_db = (res, cmd, log) => {
  const model = new Model({
    cmd: cmd,
    log: log,
  });
  model
    .save()
    .then((data) => {
      // res.send(data);
      res.redirect("/logs");
    })
    .catch((err) => {
      console.log(err);
    });
};
