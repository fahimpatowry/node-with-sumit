const express = require("express");
const fs = require('fs');

const app = express();

app.set("view engine", "ejs");

// app.get('/', (req, res)=> {
//   res.send(a); // it will handle by node
// })

app.get('/', (req, res, next)=> {
  // fs.readFile("/file-does-not-exist",  (err, data)=>{

  // }); // error will not handle by node

  // fs.readFileSync("/file-does-not-exist",  (err, data)=>{
    
  // });// error will handle by node

  // *** error 1 ***
  // fs.readFile("/file-does-not-exist",  (err, data)=>{
  //   if(err){
  //     next(err); // err next will go to next error handler middleware. won't go normal middleware.
  //   }else{
  //     res.send(date);
  //   }
  // });

  // *** error 2 ***
  // setTimeout(function(){
  //   try{
  //     console.log(a)
  //   }catch{
  //     next(err);
  //   }
  // }, 100);

  // *** error 3 ***
  // fs.readFile("/file-does-not-exist",  (err, data)=>{
  //   console.log("i am not called!");
  //   next()
  // });

  // *** error 4 Chain middleware ***
  // fs.readFile("/file-does-not-exist", [(err, data)=>{
  //   console.log(data);
  //   next(err);
  // },
  // (err, data)=>{
  //   next(err);
  //   console.log(data.property);
  // }]);

});

// ****************** Error 5 for stream  ********************
// app.get("/", (req, res) => {
//   for (let i = 0; i <= 10; i++) {
//     if (i === 5) {
//       next("there was an error!");
//     } else {
//       res.write("a");
//     }
//   }
// });
// app.use((error, req, res, next) => {
//   if (res.headersSend) {
//     next("There was a problem!");
//   } else {
//     if (error.message) {
//       res.status(500).send(error.message);
//     } else {
//       res.status(500).send("There was an error");
//     }
//   }
// });

// ****************** Error 4 ********************
// app.use((err, req, res, next) => { // when url not found
//   // res.status(404).send('Request url was not found!');
//   next('Request url was not found!') // send the response to next middleware
// })
// app.use((err, req, res, next) => {
//   if(err.message){
//     res.status(500).send(err.message);
//   }else{
//     res.status(500).send('There was an error!');
//   }
// })

// ****************** Error 3 ********************
// app.use((err, req, res, next) => {
//   console.log(err);
//   res.status(500).end('There was an error!');
// })

// ****************** Error 2 ********************
// app.get('/', (req, res)=> {
//   res.send(a); // it will handle by node
// })

// ****************** Error 1 ********************
// app.get('/', (req, res)=> {
//   throw new Error('There was an error');
// })

app.listen(3000, () => {
  console.log("listing at 3000 port");
});
