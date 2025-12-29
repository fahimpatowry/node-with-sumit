/*
 * Title: Utilities
 * Description: Important utility functions
 * Author: Fahim (Learn with Sumit)
 * Date: 28/12/2025
 *
 */

const crypto = require("crypto");
const environments = require("./environments");

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
  } else {
    return false;
  }
};

// create random string 
utilities.createRandomString = (strLength) => {
  // let length = strLength;
  let length = typeof(strLength) === 'number' && strLength > 0 ? strLength : false;

  if(length){
    let possibleCharacters = 'abcdefghijklmnopquwerxyz1234567890';
    let output = '';
    for(let i =1; i <= length; i++){
      const randomCharacter = possibleCharacters.charAt(Math.floor(Math.random() * possibleCharacters.length));
      output += randomCharacter;
    }
    return output
  }else{
    return false;
  }
};

utilities;

module.exports = utilities;
