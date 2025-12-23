/*
 * Title: Uptime Monitoring Application
 * Description: A RestFul API to monitor up or down time of user defined links
 * Author: Fahim (Learn with Sumit)
 * Date: 23/12/2025
 *
 */

// dependencies
const http = require("http");
const {handlerReqRes} = require('./heplers/handleReqRes');
const environments = require('./heplers/environments')
const data = require('./lib/data')

// app object - module scaffolding
const app = {};

// testing file system
data.create('test', "newFile", {'name': "Fahim", 'age': "26"}, (error)=>{
    console.log(error)
})

// configuration
// app.config = {
//   port: 3000,
// };

app.createServer = () => {
  const server = http.createServer(app.handleReqRes);
  console.log("environments", environments.port)
  server.listen(environments.port, () => {
    console.log(`listening to port ${environments.port}`);
  });
};

// handle Request Response
app.handleReqRes = handlerReqRes;

// start the server
app.createServer();
