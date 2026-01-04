const express = require("express");

const adminRouter = express.Router();

// router path form mode documantation

// ****************** use ********************
// adminRouter.use((req, res, next, id) => {
//   req.user = id === "1" ? "Admin" : "Anonymous";
//   next();
// });
// adminRouter.use(publicRouter);

// ****************** milldeware ********************
// const log = (req, res, next) => {
//   console.log("i am logging something!");
//   next();
// };

// adminRouter.all("*", log);

// ****************** param ********************
// adminRouter.param('user', (req, res, next, id)=> {
//     req.user = id === '1' ? 'Admin' : "Anonymous";
//     next();
// })

// adminRouter.param((param, option) => (req, res, next, val) => {
//   if (val === option) {
//     next();
//   } else {
//     res.sendStatus(403);
//   }
// }); // adminRouter.param("user", "12)"

// adminRouter.get("/:user", (req, res) => {
//   res.send(`This is ${req.user}`);
// });

// adminRouter.get('/login', (req, res)=> {
//     res.send("login");
// })

// ****************** adminRouter ********************
// adminRouter.route("/user").all((req, res, next) => {
//   console.log("i am logging something!").get("/:user", (req, res) => {
//     res.send(`This is ${req.user}`);
//   });

//   next();
// });

module.exports = adminRouter;