const express = require('express');

const app = express();


app.get("/", (req, res)=>{
    res.send("This is get request.");
});


app.listen(3000, ()=>{
    console.log("listing at 3000 port");
});
