/*
 * Title: workers Library
 * Description: workers related file
 * Author: Fahim (Learn with Sumit)
 * Date: 31/12/2025
 *
 */

// dependencies
const url = require("url");
const data = require("./data");
const http = require("http");
const https = require("https");
const { parseJson } = require("../heplers/utilities");
const { sendTwilioSMS } = require("../heplers/notifications");

// app object - module scaffolding
const workers = {};

// lookup all the checks
workers.gatherAllChecks = () => {
  // get all the checks
  data.list("checks", (err, checks) => {

    if (!err && checks && checks.length) {
      // read the checkData
      checks.forEach((check) => {
        const checkId = check.replace(".json", "").trim();

        data.read("checks", checkId, (err2, originalChecksData) => {
          if (!err2 && originalChecksData) {
            // pass tha data to next process
            workers.validationCheckData(parseJson(originalChecksData));
          } else {
            console.log("error: reading one of the check data");
          }
        });
      });
    } else {
      console.log("Error: could not find any checks to process");
    }
  });
};

// validate individual check data
workers.validationCheckData = (originalChecksData) => {
  let originalData = originalChecksData;
  if (originalData && originalData.id) {
    originalData.state =
      typeof originalData.state === "string" &&
      ["up", "down"].indexOf(originalData.state) > -1
        ? originalData.state
        : "down";
    originalData.lastChecked =
      typeof originalData.lastChecked === "number" &&
      originalData.lastChecked > 0
        ? originalData.lastChecked
        : "false";
    // next to the next process
    workers.performCheck(originalData);
  } else {
    console.log("Error: check was invalid or not formatted");
  }
};

workers.performCheck = (originalChecksData) => {
    console.log("originalChecksData",originalChecksData)
  let checkOutCome = {
    error: false,
    responseCode: false,
  };
  // mark the otu come has not have been sent yet
  let outcomeSent = false;

  // parse the hostname & full url from original data
  let parseUrl = url.parse(
    originalChecksData.protocol + "://" + originalChecksData.url,
    true
  );
  const hostname = parseJson.hostname;
  const path = parseUrl.path;

  // construct the request
  const requestDetails = {
    protocol: originalChecksData.protocol + ":",
    hostname: hostname,
    method: originalChecksData.method.toUpperCase(),
    path: path,
    timeout: originalChecksData.timeoutSeconds * 1000,
  };

  console.log("originalChecksData.timeoutSecond * 1000", originalChecksData.timeoutSeconds * 1000)

  const protocolToUse = originalChecksData.protocol === "http" ? http : https;

  let req = protocolToUse.request(requestDetails, (res) => {
    // grab the status of the response
    const status = res.statusCode;

    // update the check outcome and pass  to the next process
    checkOutCome.responseCode = status;
    if (!outcomeSent) {
      workers.processCheckOutCome(originalChecksData, checkOutCome);
      outcomeSent = true;
    }
  });

  req.on("error", (e) => {
    if (!outcomeSent) {
      checkOutCome = {
        error: true,
        value: e,
      };

      workers.processCheckOutCome(originalChecksData, checkOutCome);
      outcomeSent = true;
    }
  });

  req.on("timeout", (e) => {
    checkOutCome = {
      error: true,
      value: "timeout",
    };

    if (!outcomeSent) {
      workers.processCheckOutCome(originalChecksData, checkOutCome);
      outcomeSent = true;
    }
  });

  //request sent
  req.end();
};

workers.processCheckOutCome = (originalChecksData, checkOutCome) => {
  // check if check outcome is up of down
  let state =
    !checkOutCome.error &&
    checkOutCome.responseCode &&
    originalChecksData.successCode.indexOf(checkOutCome.responseCode) > -1
      ? "up"
      : "down";

  // decide whether we should alert the user or not
  const alertWanted =
    originalChecksData.lastChecked && originalChecksData.state === state
      ? true
      : false;

  // update the check date
  let newCheckData = originalChecksData;

  newCheckData.state = state;
  newCheckData.lastChecked = Date.now();

  // update the check to disk
  data.update("checks", newCheckData.id, newCheckData, (err1) => {
    if (!err1) {
      if (alertWanted) {
        workers.allerUserToStatusChange(newCheckData);
      } else {
        console.log("Alert is not need as not state changed");
      }
    } else {
      console.log("error trying to save check data of one of the checks!");
    }
  });
};

workers.allerUserToStatusChange = (newCheckData) => {
  let msg = `Alert: Your check for ${newCheckData.method.toUpperCase()} ${
    newCheckData.protocol
  }://${newCheckData.url} is currently ${newCheckData.state}`;

  // sendTwilioSMS(newCheckData.userPhone, msg, (error)=>{
  //     if(!error){
  //         console.log('user was alerted to a status change via SMS')
  //     }else{
  //         console.log("there was a problem sending SMS")
  //     }
  // }) //now twilio not worked
};

// timer to execute the worker process once per minute
workers.loop = () => {
  setInterval(() => {
    workers.gatherAllChecks();
  }, 1000 * 60);
};

// start the workers
workers.init = () => {
  //execute all the checks
  workers.gatherAllChecks();

  // call the loop so that checks continue
  workers.loop();
};

// start the server
workers.init();

module.exports = workers;
