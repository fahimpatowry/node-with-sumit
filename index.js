const express = require("express");
const multer = require("multer");
const path = require("path");

const app = express();
app.set("view engine", "ejs");

const UPLOAD_FOLDER = "./uploads/";

// define the storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOAD_FOLDER);
  },
  filename: (req, file, cb) => {
    const fileExt = path.extname(file.originalname);
    const fileName =
      file.originalname
        .replace(fileExt, "")
        .toLowerCase()
        .split(" ")
        .join("-") +
      "-" +
      Date.now();

    cb(null, fileName + fileExt);
  },
});

var upload = multer({
  storage: storage,
  limits: {
    fileSize: 1000000, // 1MB
  },
  fileFilter: (req, file, cb) => {
    if (file.fieldname === "avatar") {
      if (
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg"
      ) {
        cb(null, true);
      } else {
        cb(new Error("Only .jpg, .png or .jpeg format allowed!"));
      }
    } else if (file.fieldname === "doc") {
      if (file.mimetype === "application/pdf") {
        cb(null, true);
      } else {
        cb(new Error("Only .pdf format allowed!"));
      }
    } else {
      cb(new Error("There was an unknown error!"));
    }
  },
});

// app.post("/", upload.single('avatar'), (req, res) => { // for single file
// app.post("/", upload.array("avatar"), (req, res) => { // for multiple file
// app.post("/", upload.fields([
//   {
//     name: 'avatar',
//     maxCount: 1
//   },{
//     name: 'gallery',
//     maxCount: 2
//   }
// ]), (req, res) => {
// for multiple input option file. take a object
// app.post("/", upload.none(), (req, res) => {
  app.post(
    "/",
    upload.fields([
      {
        name: "avatar",
        maxCount: 2,
      },
      {
        name: "doc",
        maxCount: 1,
      },
    ]),
    (req, res, next) => {
      res.send("success");
    }
  );

app.use((err, req, res, next) => {
  if (err) {
    if (err instanceof multer.MulterError) {
      res.status(500).send("There was an upload error!");
    } else {
      res.status(500).send(err.message);
    }
  } else {
    res.send("success");
  }
});

app.listen(3000, () => {
  console.log("listing at 3000 port");
});
