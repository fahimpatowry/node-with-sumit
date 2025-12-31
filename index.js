const express = require('express');

const app = express();

// ******** express data formate *********
// app.use(express.json());
// app.use(express.row());
// app.use(express.text());
// app.use(express.urlencoded());

// **************** express static ***************
// app.use(express.static(__dirname+'/public/'))
// app.use(express.static(__dirname+'/public/', {
//     index: 'home.html',
// })) // if file nto fund it will go in home.html file

// **************** Router ***************
// const route = express.Router();
// const route = express.Router({
//     caseSensitive: true,
// });
// app.use(route);
// route.get('/about', (req, res)=>{
//     res.send("this is about page")
// })

// app.get("/", (req, res)=>{
//     console.log("req", req.body);
//     // console.log("res", res);
//     res.send("This is get request.");
// });


app.listen(3000, ()=>{
    console.log("listing at 3000 port");
});
