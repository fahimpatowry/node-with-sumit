const express = require("express");
// const handleLocals = require('./Topic/handleLocals');

const app = express();
// app.use(express.json());

// **************** application local ***************
// app.locals.title = 'My App';
// app.get('/', handleLocals)

// **************** application mountpath ***************
// const admin = express();
// admin.get("/dashboard", (req, res)=>{
//     console.log(`this is dashboard`)
//     console.log(admin.mountpath)
// })
// app.use('/admin', admin)

// **************** application mountpath ***************
// admin.on("mount", (parent) => {
//   console.log("parent", parent);
// });

// **************** application all ***************
// app.all("/", (req, res) => { //it will take all method get, put, post, delete etc
//     console.log(`this is local variable ${req.app.locals.title}`);
//   });

// **************** application param ***************
// app.param('id', (req, res, next, id) => {
//   const user = {
//     id,
//     name: "Fahim",
//   };
//   req.user = user;
//   next();
// });
// app.get('/user/:id', (req, res) => {
//   console.log(`this is local variable ${req.user}`);
//   res.end("got it")
// });

// **************** application route ***************
// app.route("/dashboard/home")
//     .get((req, res)=>{
//         res.send("this is dashboard home get")
//     })
//     .put((req, res)=>{
//         res.send("this is dashboard home put")
//     })
//     .post((req, res)=>{
//         res.send("this is dashboard home post")
//     })

// app.get("/", (req, res) => {
//   console.log(`this is local variable ${req.app.locals.title}`);
// });

// **************** application ejs engin ***************
// app.set('view engine', 'ejs');

// app.get('/about', (req, res)=>{
//     res.render('pages/about')
// })

app.listen(3000, () => {
  console.log("listing at 3000 port");
});
