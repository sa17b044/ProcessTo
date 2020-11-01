const express = require("express");
const cp = require("child_process");
const fs = require("fs");
// express app
const app = express();
//database
// const mongoose = require("mongoose");
// const Model = require("./models/schema");
// const dbURL = "mongodb://127.0.0.1:27017/test";
// mongoose
//   .connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then((data) => {
//     //after db connection run the server
//     app.listen(3000);
//   })
//   .catch((err) => {
//     console.log("Error" + err);
//   });

//register view engine
app.set("view engine", "ejs");
// app.set('views','myViews');
// listen port
app.listen(3000);
//middlewar + static file
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
// app.get("/addData", (req, res) => {
//   const model = new Model({
//     log: "Test Test LOG Test Test",
//   });
//   model
//     .save()
//     .then((data) => {
//       res.send(data);
//       // res.render("showLog", { title: "Log", data });
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });
// app.get("/addData2", (req, res) => {
//   const model = new Model({
//     log: "Test2 Test2 LOG Test2 Test2",
//   });
//   model
//     .save()
//     .then((data) => {
//       res.send(data);
//       // res.render("showLog", { title: "Log", data });
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });
// app.get("/allData", (req, res) => {
//   Model.find()
//     .then((data) => {
//       res.send(data);
//       // res.render("showLog", { title: "Log", data });
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

// app.use((req, res, next) => {
//   console.log(req.url, req.path, req.method, req.hostname, req.httpVersion);
//   next();
// });

app.get("/", (req, res) => {
  //set automaticliy content and everything
  //res.send("<h2>Home</h2>");
  //res.sendFile("./views/index.html", { root: __dirname });
  //render a array
  res.render("index", { title: "Home" });
});
app.get("/command", (req, res) => {
  //set automaticliy content and everything
  //res.send("<h2>Second</h2>");
  //res.sendFile("./views/second.html", { root: __dirname });
  res.render("command", { title: "Command" });
});
//redirects
// app.get("/sec", (req, res) => {
//   res.redirect("/Second");
// });
// app.get("/logs", (req, res) => {
//   Model.find()
//     .sort({ createdAt: -1 })
//     .then((data) => {
//       // res.send(data);
//       res.render("logs", { title: "Logs", data });
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

app.get("/logs", (req, res) => {
  // Model.find()
  // .sort({ createdAt: -1 })
  // .then((data) => {
  //   // res.send(data);
  //   res.render("logs", { title: "Logs", data });
  // })
  // .catch((err) => {
  //   console.log(err);
  // });
  readFromFile();
  res.render("logs", { title: "logs" });
});

app.post("/logs", (req, res) => {
  // console.log(req.body.cmd);
  writeToFile(req.body.cmd);
  // const model = new Model(req.body);
  // model
  //   .save()
  //   .then((data) => {
  //     // res.send(data);
  //     // myTest(data);
  // res.redirect("/logs");
  //     // res.render("showLog", { title: "Log", data });
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });

  // cp.exec("ls -la", (error, stdout, stderr) => {
  //   if (error) {
  //     console.error(`exec error: ${error}`);
  //     return;
  //   }
  //   console.log(`stdout: ${stdout}`);
  //   // // myTest(stdout);
  //   // console.error(`stderr: ${stderr}`);
  // });
});
//route parameters
// app.get("/logs/:id", (req, res) => {
//   const id = req.params.id;
//   Model.findById(id)
//     .then((data) => {
//       // res.send(data);
//       res.render("details", { data, title: "details" });
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

//404
app.use((req, res) => {
  //res.status(404).sendFile("./views/404.html", { root: __dirname });
  res.status(404).render("404", { title: "Error" });
});

//  const myTest = (data)=>{
//    console.log('######################');
//   console.log(data.log);
//  }

// cp.exec("snort -V", (error, stdout, stderr) => {
//   if (error) {
//     console.error(`exec error: ${error}`);
//     return;
//   }
//   console.log(`stdout: ${stdout}`);
//   myTest(stdout);
//   console.error(`stderr: ${stderr}`);
// });

// const myTest = (data) => {
//   console.log("######################");
//   console.log(data);
//   return data;
// };

//Writing a File Asynchronously using nodejs


const writeToFile = (data) => {

  cp.exec(data, (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
  fs.writeFile("log.txt", `${data}\n${stdout}`, (err) => {
    if (err) throw err;
    console.log("File saved!");
  });
  // console.log(`stdout: ${stdout}`);
  // console.error(`stderr: ${stderr}`);
});
};

// import fs module
const readFromFile = ()=>{
fs.readFile('log.txt', (err, data) => {
	if (err)
		throw err;
	console.log("Content of the file :  " + data);
});
}
