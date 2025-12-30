/*
 * Title: Server Library
 * Description: Server related file
 * Author: Fahim (Learn with Sumit)
 * Date: 31/12/2025
 *
 */

// dependencies
const http = require("http");
const {handlerReqRes} = require('../heplers/handleReqRes');
const environments = require('../heplers/environments')

// app object - module scaffolding
const server = {};

// ------- testing file system --------
// data.create('test', "newFile", {'name': "Fahim", 'age': "26"}, (error)=>{
//     console.log(error)
// })
// data.read('test', "newFile", (error, data)=>{
//     console.log(error, data)
// })
// data.update('test', "newFile", {'name': "Rahim", 'age': "17"}, (error)=>{
//     console.log(error)
// })
// data.delete('test', "newFile", (error)=>{
//     console.log(error)
// })

// ---------- configuration ---------
// app.config = {
//   port: 3000,
// };

// sendTwilioSMS('01828093765', "hello world", (err)=> {
//   console.log(`this is err: ${err}`)
// })

server.createServer = () => {
  const createServerVariable = http.createServer(server.handleReqRes);
  
  createServerVariable.listen(environments.port, () => {
    console.log(`listening to port ${environments.port}`);
  });
};

// handle Request Response
server.handleReqRes = handlerReqRes;

// start the server
server.init = () =>{
    server.createServer()
};

module.exports = server;
