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
// const Model = require("./models/schema");
const Policy_Model = require("./models/policy_schema");
const Server_Model = require("./models/server_schema");
const { timeStamp } = require("console");
const dbURL = "mongodb://127.0.0.1:27017/data";
mongoose
  .connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((data) => {
    app.listen(3000);
    console.log("http://localhost:3000/");
    console.log("Server is running ...");
  })
  .catch((err) => {
    console.log("Error" + err);
  });
// EJS
app.set("view engine", "ejs");
// Public Folder
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
//Home
app.get("/", (req, res) => {
  res.render("index", { title: "Home" });
});

app.get("/command", (req, res) => {
  res.render("command", { title: "Command" });
});
//
app.post("/add_log", (req, res) => {
  let cmd = req.body.cmd;
  cp.exec(cmd, (error, stdout, stderr) => {
    // stdout = stdout.replace('\n', 'x');
    if (error) {
      console.error(`exec error: ${error}`);
      res.render("command", { title: "Command", error: error });
      return;
    }
    add_log_db(res, cmd, stdout);
  });
});
app.get("/upload", (req, res) => {
  res.render("upload", { title: "upload" });
});
// Server section
app.get("/servers", (req, res) => {
  res.render("servers", { title: "servers" });
});
app.post("/sNewConf", (req, res) => {
  data = req.body;
  console.log(data);
  add_server_db(res,data)
  // res.redirect("servers");
});
// Policy Section
app.get("/policies", (req, res) => {
  res.render("policies", { title: "policies" });
});
app.post("/pNewConf", (req, res) => {
  data = req.body;
  console.log(data);
  add_ploicy_db(res,data);
  // res.redirect("policies");
});
//
app.post("/upload", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.render("/upload", { msg: err });
    } else {
      console.log(req.file);
      res.redirect("/upload");
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

// database to log
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

const add_ploicy_db = (res,data) => {
  const model = new Policy_Model({
    policy_name: data.policy_name,
    inspection: data.inspection,
    detection: data.detection,
    individual_addressing: data.individual_addressing,
    SEARCH_REQUEST: data.SEARCH_REQUEST,
    DESCRIPTION_REQUEST: data.DESCRIPTION_REQUEST,
    A_IndividualAddress_Write: data.A_IndividualAddress_Write,
    A_IndividualAddress_Read: data.A_IndividualAddress_Read,
    group_address_level: data.group_address_level,
    group_address_file: data.group_address_file,
    header: data.header,
    payload: data.payload,
  });
  model
    .save()
    .then((data) => {
      res.redirect("/policies");
    })
    .catch((err) => {
      console.log(err);
    });
};
////
const add_server_db = (res,data) => {
  const model = new Server_Model({
    src_ip: data.src_ip,
    src_port: data.src_port,
    dst_ip: data.dst_ip,
    dst_port: data.dst_port,
    policy: data.policy,
    logKNXnetip: data.logKNXnetip,
    logToFile: data.logToFile,
  });
  model
    .save()
    .then((data) => {
      res.redirect("/servers");
    })
    .catch((err) => {
      console.log(err);
    });
};
