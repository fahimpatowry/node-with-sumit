const express = require("express");

const app = express();

app.set("view engine", "ejs");


app.listen(3000, () => {
  console.log("listing at 3000 port");
});
