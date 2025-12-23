/*
 * Title: Handle Request Response
 * Description: Handle Request Response
 * Author: Fahim (Learn with Sumit)
 * Date: 23/12/2025
 *
 */

// dependencies
const url = require("url");
const { StringDecoder } = require("string_decoder");
const { buffer } = require("stream/consumers");
const routes = require("../routes");
const {
  notFoundHandler,
} = require("../handlers/routeHandlers/notFoundHandler");

//  module scaffolding
const handler = {};

handler.handlerReqRes = (req, res) => {
  // Request handling
  // get the url and parse it
  const parsedURl = url.parse(req.url, true);
  const path = parsedURl.path;
  const trimmedPath = path.replace(/^\/+|\/+$/g, "");
  const method = req.method.toLowerCase();
  const queryStringObject = parsedURl.query;
  const headerObject = req.headers;

  const requestProperties = {
    parsedURl,
    path,
    trimmedPath,
    method,
    queryStringObject,
    headerObject
  }

  const decoder = new StringDecoder("utf-8");
  let realData = "";

  const chosenHandler = routes[trimmedPath] ? routes[trimmedPath] : notFoundHandler;
  chosenHandler(requestProperties, (statusCode, payload)=>{
    statusCode = typeof(statusCode) === 'number' ? statusCode : 500;
    payload = typeof(payload) === 'object' ? payload : {}

    const payloadString = JSON.stringify(payload)

    res.writeHead(statusCode);
    res.end(payloadString)
  })

  req.on("data", (buffer) => {
    realData += decoder.write(buffer);
  });

  req.on("end", () => {
    realData += decoder.end();
    console.log(realData);

    // response handler
    res.end(`Hello World hi /n ${realData}`);
  });
};

module.exports = handler;
