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
        let expires = Date.now() + 3600 * 60 * 1000;

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

handler._token.get = (requestProperties, callback) => {
  const id =
    typeof requestProperties.queryStringObject.id === "string" &&
    requestProperties.queryStringObject.id.trim().length === 20
      ? requestProperties.queryStringObject.id
      : false;

  if (id) {
    // look up the token
    data.read("tokens", id, (err, tokenData) => {
      const token = { ...parseJson(tokenData) };

      if (!err && token) {
        callback(200, token);
      } else {
        callback(404, {
          error: "request token not found in file",
        });
      }
    });
  } else {
    callback(404, {
      error: "request token not found",
    });
  }
};

handler._token.put = (requestProperties, callback) => {
  const id =
    typeof requestProperties.body.id === "string" &&
    requestProperties.body.id.trim().length === 20
      ? requestProperties.body.id
      : false;
  const extend =
    typeof requestProperties.body.extend === "boolean" &&
    requestProperties.body.extend === true
      ? requestProperties.body.extend
      : false;

  if (id && extend) {
    data.read("tokens", id, (err1, tokenData) => {
      let tokenObject = parseJson(tokenData);

      console.log("tokenObject: ", tokenObject);
      if (tokenObject.expires > Date.now()) {
        tokenObject.expires = Date.now() + 360 * 60 * 1000;
        data.update("tokens", id, tokenObject, (err2) => {
          if (!err2) {
            callback(200, {
              error: "Expire updated",
            });
          } else {
            callback(500, {
              error: "There was a server side error",
            });
          }
        });
      } else {
        callback(400, {
          error: "Token already expired",
        });
      }
    });
  } else {
    callback(404, {
      error: "request token not found",
    });
  }
};

handler._token.delete = (requestProperties, callback) => {
  const id =
    typeof requestProperties.queryStringObject.id === "string" &&
    requestProperties.queryStringObject.id.trim().length === 20
      ? requestProperties.queryStringObject.id
      : false;

  if (id) {
    let isDelete = true;
    data.read("tokens", id, (err1, tokenData) => {
      if (!err1 && tokenData) {
        // isDelete = true;
        data.delete("tokens", id, (err) => {
          if (isDelete) {
            if (!err) {
              callback(200, { massage: "token successfully deleted" });
            } else {
              callback(500, { massage: "side error" });
            }
          }
        });
      } else {
        callback(500, {
          massage: "there a server side error",
        });
      }
    });
  } else {
    callback(400, {
      error: "There was a problem in you request",
    });
  }
};

handler._token.verify = (id, phone, callback) => {
  data.read("tokens", id, (err1, tokenData) => {
    if (!err1 && tokenData) {
      const data = parseJson(tokenData);

      if (data.phone === phone && data.expires > Date.now()) {
        callback(true);
      }
    } else {
      callback(false);
    }
  });
};

module.exports = handler;
