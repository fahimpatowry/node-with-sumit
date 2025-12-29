/*
 * Title: Check Handler
 * Description: Handler to handle user defined checks
 * Author: Fahim (Learn with Sumit)
 * Date: 29/12/2025
 *
 *
 */

// dependencies
const data = require("../lib/data");
const { parseJson, createRandomString } = require("../heplers/utilities");
const tokenHandler = require("./tokenHandler");
const { maxChecks } = require("../heplers/environments");

const handler = {};

handler.checkHandler = (requestProperties, callback) => {
  const acceptedMethods = ["get", "post", "put", "delete"];

  if (acceptedMethods.indexOf(requestProperties.method) > -1) {
    handler._check[requestProperties.method](requestProperties, callback);
  } else {
    callback(405, "fuck");
  }
};

handler._check = {};

handler._check.post = (requestProperties, callback) => {
  // validate inputs
  let protocol =
    typeof requestProperties.body.protocol === "string" &&
    ["http", "https"].indexOf(requestProperties.body.protocol) > -1
      ? requestProperties.body.protocol
      : false;

  let url =
    typeof requestProperties.body.url === "string" &&
    requestProperties.body.url.trim().length > 0
      ? requestProperties.body.url
      : false;
  let method =
    typeof requestProperties.body.method === "string" &&
    ["get", "post", "put", "delete"].indexOf(requestProperties.body.method) > -1
      ? requestProperties.body.method
      : false;
  let successCodes =
    typeof requestProperties.body.successCodes === "object" &&
    requestProperties.body.successCodes instanceof Array
      ? requestProperties.body.successCodes
      : false;
  let timeoutSeconds =
    typeof requestProperties.body.timeoutSeconds === "number" &&
    requestProperties.body.timeoutSeconds % 1 === 0 &&
    requestProperties.body.timeoutSeconds >= 1 &&
    requestProperties.body.timeoutSeconds <= 5
      ? requestProperties.body.timeoutSeconds
      : false;

  if (protocol && url && method && successCodes && timeoutSeconds) {
    let token =
      typeof requestProperties.headerObject.token === "string"
        ? requestProperties.headerObject.token
        : false;

    // lookup the user phone by reading the token
    data.read("tokens", token, (err1, tokenData) => {
      if (!err1 && tokenData) {
        let userPhone = parseJson(tokenData).phone;
        // lookup the user date
        data.read("users", userPhone, (err2, userData) => {
          if (!err2 && userData) {
            tokenHandler._token.verify(token, userPhone, (tokeID) => {
              if (tokeID) {
                let userObject = parseJson(userData);
                let userChecks =
                  typeof userObject.checks === "object" &&
                  userObject.checks instanceof Array
                    ? userObject.checks
                    : [];

                if (userChecks.length < maxChecks) {
                  let checkId = createRandomString(20);
                  let checkObject = {
                    id: checkId,
                    userPhone,
                    protocol,
                    url,
                    method,
                    successCodes,
                    timeoutSeconds,
                  };

                  data.create("checks", checkId, checkObject, (err3) => {
                    if (!err3) {
                      // add check id to the user object
                      userObject.checks = userChecks;
                      userObject.checks.push(checkId);

                      // save the new user date
                      data.update("users", userPhone, userObject, (err4) => {
                        if (!err4) {
                          // re
                          callback(200, userObject);
                        } else {
                          callback(500, {
                            error: "server error user save",
                          });
                        }
                      });
                    } else {
                      callback(500, {
                        error: "server error checks save",
                      });
                    }
                  });
                } else {
                  callback(401, {
                    error: "user has already reached max check limit",
                  });
                }
              } else {
                callback(403, {
                  error: "Authentication problem",
                });
              }
            });
          } else {
            callback(403, {
              error: "user not found",
            });
          }
        });
      } else {
        callback(403, {
          error: "token not found problem",
        });
      }
    });
  } else {
    callback(400, {
      error: "You have a problem in payload",
    });
  }
};

handler._check.get = (requestProperties, callback) => {
  const id =
    typeof requestProperties.queryStringObject.id === "string" &&
    requestProperties.queryStringObject.id.trim().length === 20
      ? requestProperties.queryStringObject.id
      : false;

  if (id) {
    // look up the token
    data.read("checks", id, (err, checksData) => {
      const checks = { ...parseJson(checksData) };

      if (!err && checks) {
        // verify token
        let token =
          typeof requestProperties.headerObject.token === "string"
            ? requestProperties.headerObject.token
            : false;
        tokenHandler._token.verify(token, checks.userPhone, (tokeID) => {
          if (tokeID) {
            callback(200, checks);
          } else {
            callback(403, {
              error: "Authentication failure!",
            });
          }
        });
      } else {
        callback(404, {
          error: "request checks not found in file",
        });
      }
    });
  } else {
    callback(404, {
      error: "request id not found",
    });
  }
};

handler._check.put = (requestProperties, callback) => {
  const id =
    typeof requestProperties.body.id === "string" &&
    requestProperties.body.id.trim().length === 20
      ? requestProperties.body.id
      : false;

  // validate inputs
  let protocol =
    typeof requestProperties.body.protocol === "string" &&
    ["http", "https"].indexOf(requestProperties.body.protocol) > -1
      ? requestProperties.body.protocol
      : false;

  let url =
    typeof requestProperties.body.url === "string" &&
    requestProperties.body.url.trim().length > 0
      ? requestProperties.body.url
      : false;
  let method =
    typeof requestProperties.body.method === "string" &&
    ["get", "post", "put", "delete"].indexOf(requestProperties.body.method) > -1
      ? requestProperties.body.method
      : false;
  let successCodes =
    typeof requestProperties.body.successCodes === "object" &&
    requestProperties.body.successCodes instanceof Array
      ? requestProperties.body.successCodes
      : false;
  let timeoutSeconds =
    typeof requestProperties.body.timeoutSeconds === "number" &&
    requestProperties.body.timeoutSeconds % 1 === 0 &&
    requestProperties.body.timeoutSeconds >= 1 &&
    requestProperties.body.timeoutSeconds <= 5
      ? requestProperties.body.timeoutSeconds
      : false;

  if (id) {
    if (protocol || url || method || successCodes || timeoutSeconds) {
      data.read("checks", id, (err1, checkData) => {
        if (!err1 && checkData) {
          let checkObject = parseJson(checkData);

          // check token
          let token =
            typeof requestProperties.headerObject.token === "string"
              ? requestProperties.headerObject.token
              : false;
          tokenHandler._token.verify(token, checkObject.userPhone, (tokeID) => {
            if (tokeID) {
              if (protocol) {
                checkObject.protocol = protocol;
              }
              if (url) {
                checkObject.url = url;
              }
              if (method) {
                checkObject.method = method;
              }
              if (successCodes) {
                checkObject.successCodes = successCodes;
              }
              if (timeoutSeconds) {
                checkObject.timeoutSeconds = timeoutSeconds;
              }
              // store the check object
              data.update("checks", id, checkObject, (err2) => {
                if (!err2) {
                  callback(200, checkObject);
                } else {
                  callback(500, {
                    error: "server error when update",
                  });
                }
              });
            } else {
              callback(403, {
                error: "Authentication failure!",
              });
            }
          });
        } else {
          callback(500, {
            error: "Check not found",
          });
        }
      });
    } else {
      callback(404, {
        error: "you must provide at least one field to update",
      });
    }
  } else {
    callback(404, {
      error: "Id is not ok ",
    });
  }
};

handler._check.delete = (requestProperties, callback) => {
  const id =
    typeof requestProperties.queryStringObject.id === "string" &&
    requestProperties.queryStringObject.id.trim().length === 20
      ? requestProperties.queryStringObject.id
      : false;

  if (id) {
    // look up the token
    data.read("checks", id, (err1, checksData) => {
      const checks = { ...parseJson(checksData) };
      console.log("checks:", checks);

      if (!err1 && checks) {
        // verify token
        let token =
          typeof requestProperties.headerObject.token === "string"
            ? requestProperties.headerObject.token
            : false;
        tokenHandler._token.verify(token, checks.userPhone, (tokeID) => {
          if (tokeID) {
            //delete the check data
            data.delete("checks", id, (err2) => {
              if (!err2) {
                data.read("users", checks.userPhone, (err3, userData) => {
                  if (!err3 && userData) {
                    let userObject = parseJson(userData);
                    let userChecks =
                      typeof userObject.checks === "object" &&
                      userObject.checks instanceof Array
                        ? userObject.checks
                        : false;

                    console.log("userObject:", userObject);
                    console.log("userChecks:", userChecks);
                    if (userChecks) {
                      // remove checks
                      let checkPosition = userChecks.indexOf(id);
                      if (checkPosition > -1) {
                        userChecks.splice(checkPosition, 1);
                        // resave this user data
                        userObject.checks = userChecks;

                        data.update(
                          "users",
                          userObject.phone,
                          userObject,
                          (err4) => {
                            if (!err4) {
                              callback(200, { userObject });
                            } else {
                              callback(500, {
                                error: "user not updated",
                              });
                            }
                          }
                        );
                      }
                    } else {
                      callback(500, {
                        error: "check are nto object in user table",
                      });
                    }
                  } else {
                    callback(500, {
                      error: "user not found in user table",
                    });
                  }
                });
              } else {
                callback(500, {
                  error: "server error when delete",
                });
              }
            });
          } else {
            callback(403, {
              error: "Authentication failure!",
            });
          }
        });
      } else {
        callback(404, {
          error: "request checks not found in file",
        });
      }
    });
  } else {
    callback(404, {
      error: "request id not found",
    });
  }
};

module.exports = handler;
