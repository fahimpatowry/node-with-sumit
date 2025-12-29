/*
 * Title: Token Handler
 * Description: Handler to handle token related route
 * Author: Fahim (Learn with Sumit)
 * Date: 29/12/2025
 *
 */

// dependencies
const data = require("../lib/data");
const { hash, createRandomString } = require("../heplers/utilities");
const { parseJson } = require("../heplers/utilities");
const { token } = require("../routes");

const handler = {};

handler.tokenHandler = (requestProperties, callback) => {
  const acceptedMethods = ["get", "post", "put", "delete"];

  if (acceptedMethods.indexOf(requestProperties.method) > -1) {
    handler._token[requestProperties.method](requestProperties, callback);
  } else {
    callback(405, "fuck");
  }
};

handler._token = {};

handler._token.post = (requestProperties, callback) => {
  const phone =
    typeof requestProperties.body.phone === "string" &&
    requestProperties.body.phone.trim().length === 11
      ? requestProperties.body.phone
      : false;
  const password =
    typeof requestProperties.body.password === "string" &&
    requestProperties.body.password.trim().length > 0
      ? requestProperties.body.password
      : false;

  if (phone && password) {
    data.read("users", phone, (err1, userData) => {
      let hashPassword = hash(password);
        
      if (hashPassword === parseJson(userData).password) {
        let tokenId = createRandomString(20);
        let expires = Date.now() + 60 * 60 * 1000;

        let tokenObject = {
          phone,
          id: tokenId,
          expires,
        };

        // store the toke
        data.create("tokens", tokenId, tokenObject, (err2) => {
          if (!err2) {
            callback(200, tokenObject);
          } else {
            callback(400, {
              error: "There have a issue when it added in file",
            });
          }
        });
      } else {
        callback(400, {
          error: "password is not valid",
        });
      }
    });
  } else {
    callback(400, {
      error: "You have a problem in data",
    });
  }
};

handler._token.get = (requestProperties, callback) => {};

handler._token.put = (requestProperties, callback) => {};

handler._token.delete = (requestProperties, callback) => {};

module.exports = handler;
