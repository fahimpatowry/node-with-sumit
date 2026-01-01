const express = require("express");

const app = express();

app.set("view engine", "ejs");

// ************ res locals ************
// app.get('/about', (req, res)=>{
//   console.log(res.hasHeader()); // will give false
//   res.render('pages/about',{
//     name: 'BD' // local variable
//   })
//   console.log(res.hasHeader()); // will give true
// })

// ************ json format ************
// app.get("/about", (req, res) => {
//   res.format({ // will check header accept
//     "text/plain": () => {
//       res.send("hi");
//     },
//     "text/html": () => {
//       res.render("pages/about", {
//         name: "BD", // local variable
//       });
//     },
//     "application/json": () => {
//       res.json({
//         message: "hi this is json",
//       });
//     },
//     default: ()=>{
//       res.status(200).send('this type not expectable')
//     }
//   });
// });

app.listen(3000, () => {
  console.log("listing at 3000 port");
});

// Response Object:
//   Represents the HTTP response
//   res.App
//   headerSent
//   Locals
//   Cookie
//   res.clearCookie()
//   res.end() // without date 
//   res.send() // with date 
//   res.json() // give json resposne
//   res.sendStaus() // it will send staus and end the response
//   res.render() // give the view html file
//   res.formate()
//   res.location()
//   res.redireact()
//   res.get() 
//   res.set() 
