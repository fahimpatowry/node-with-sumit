/*
 * Title: Utilities
 * Description: Important utility functions
 * Author: Fahim (Learn with Sumit)
 * Date: 28/12/2025
 *
 */

const crypto = require("crypto");
const environments = require("../../heplers/environments");

// module scaffolding
const utilities = {};

// parse Json String to objeact
utilities.parseJson = (jsonString) => {
  let output;

  try {
    output = JSON.parse(jsonString);
  } catch {
    output = {};
  }

  return output;
};

// hash string
utilities.hash = (str) => {
  if (typeof str === "string" && str.length > 0) {
    let hash = crypto
      .createHmac("sha256", environments.secretkey)
      .update(str)
      .digest("hex");
      return hash;
  }else{
    return false;
  }
};

utilities;

module.exports = utilities;
