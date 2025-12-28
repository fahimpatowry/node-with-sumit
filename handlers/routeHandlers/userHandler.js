/*
 * Title: User Handler
 * Description: Handler to handle user related routes
 * Author: Fahim (Learn with Sumit)
 * Date: 28/12/2025
 *
 *
 */

// dependencies
const data = require("../../lib/data");
const { hash } = require("../../handlers/routeHandlers/utilities");
const { parseJson } = require("../../handlers/routeHandlers/utilities");

const handler = {};

handler.userHandler = (requestProperties, callback) => {
  const acceptedMethods = ["get", "post", "put", "delete"];

  if (acceptedMethods.indexOf(requestProperties.method) > -1) {
    handler._users[requestProperties.method](requestProperties, callback);
  } else {
    callback(405, "fuck");
  }
};

handler._users = {};

handler._users.post = (requestProperties, callback) => {
  const firstName =
    typeof requestProperties.body.firstName === "string" &&
    requestProperties.body.firstName.trim().length > 0
      ? requestProperties.body.firstName
      : false;
  const lastName =
    typeof requestProperties.body.lastName === "string" &&
    requestProperties.body.lastName.trim().length > 0
      ? requestProperties.body.lastName
      : false;
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
  const tosAgreement =
    typeof requestProperties.body.tosAgreement === "boolean" &&
    requestProperties.body.tosAgreement
      ? requestProperties.body.tosAgreement
      : false;

  if (firstName && lastName && phone && password && tosAgreement) {
    // make sure that the user doesn't already exist
    data.read("users", phone, (err1) => {
      if (err1) {
        let userObject = {
          firstName,
          lastName,
          phone,
          password: hash(password),
          tosAgreement,
        };
        // store the user to db/file
        data.create("users", phone, userObject, (err2) => {
          if (!err2) {
            callback(200, {
              massage: "User created successfully",
            });
          } else {
            callback(500, { err2: "could not create user!" });
          }
        });
      } else {
        callback(500, {
          error: "There was a problem in server side!",
        });
      }
    });
  } else {
    callback(400, {
      error: "You have a problem in payload",
    });
  }
};

handler._users.get = (requestProperties, callback) => {
  // check the phone number is valid

  const phone =
    typeof requestProperties.queryStringObject.phone === "string" &&
    requestProperties.queryStringObject.phone.trim().length === 11
      ? requestProperties.queryStringObject.phone
      : false;

  if (phone) {
    // look up the user
    data.read("users", phone, (err, u) => {
      const user = { ...parseJson(u) };

      if (!err && user) {
        delete user.password;
        callback(200, user);
      } else {
        callback(404, {
          error: "request user not found in file",
        });
      }
    });
  } else {
    callback(404, {
      error: "request user not found",
    });
  }
};

handler._users.put = (requestProperties, callback) => {
  const phone =
    typeof requestProperties.body.phone === "string" &&
    requestProperties.body.phone.trim().length === 11
      ? requestProperties.body.phone
      : false;
  const firstName =
    typeof requestProperties.body.firstName === "string" &&
    requestProperties.body.firstName.trim().length > 0
      ? requestProperties.body.firstName
      : false;
  const lastName =
    typeof requestProperties.body.lastName === "string" &&
    requestProperties.body.lastName.trim().length > 0
      ? requestProperties.body.lastName
      : false;
  const password =
    typeof requestProperties.body.password === "string" &&
    requestProperties.body.password.trim().length > 0
      ? requestProperties.body.password
      : false;

  if (phone) {
    if (firstName | lastName | password) {
      // loopkup the user
      data.read("users", phone, (err1, uData) => {
        const userData = { ...parseJson(uData) };
        if (!err1 && uData) {
          if (firstName) {
            userData.firstName = firstName;
          }
          if (lastName) {
            userData.lastName = lastName;
          }
          if (password) {
            userData.password = hash(password);
          }

          // store to data base
          data.update("user", phone, userData, (err2) => {
            if (err2) {
              callback(200, { massage: "user updated successfully" });
            } else {
              callback(500, { error: "server error" });
            }
          });
        } else {
          callback(400, {
            error: "You have a problem in you request when read",
          });
        }
      });
    } else {
      callback(400, { error: "You have a problem in you request" });
    }
  } else callback(400, { error: "invalid phone number" });
};

handler._users.delete = (requestProperties, callback) => {
  const phone =
    typeof requestProperties.queryStringObject.phone === "string" &&
    requestProperties.queryStringObject.phone.trim().length === 11
      ? requestProperties.queryStringObject.phone
      : false;
  console.log("phone", phone);

  if (phone) {
    let isDelete = true;
    data.read("users", phone, (err1, data) => {
      if (!err1) {
        isDelete = true;
      } else {
        callback(500, {
          massage: "there a server side error",
        });
      }
    });

    data.delete("users", phone, (err) => {
      if (isDelete) {
        if (!err) {
          callback(200, { massage: "user successfully deleted" });
        } else {
          callback(500, { massage: "there was a server side error" });
        }
      }
    });
  } else {
    callback(400, {
      error: "There was a problem in you request",
    });
  }
};

module.exports = handler;
