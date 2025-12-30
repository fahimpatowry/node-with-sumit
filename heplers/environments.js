/*
 * Title: Environments
 * Description: Environments
 * Author: Fahim (Learn with Sumit)
 * Date: 23/12/2025
 *
 */

//
const environments = {};

environments.staging = {
  port: 3000,
  envName: "staging",
  secretkey: 'h242sdfss',
  maxChecks: 5,
  twilio:{
    fromPhone: '+15005550008',
    accountSid: 'ACb32d411ad7fe886aac54c665d25e5c5d',
    authToken: '9455e3eb3109edc12e3d8c92768f7a67',
  },
};

environments.production = {
  port: 5000,
  envName: "production",
  secretkey: 'iuououusfds',
  maxChecks: 5,
  twilio:{
    fromPhone: '+15005550008',
    accountSid: 'ACb32d411ad7fe886aac54c665d25e5c5d',
    authToken: '9455e3eb3109edc12e3d8c92768f7a67',
  },
};

// determine which environment was passed
const currentEnvironment =
  typeof process.env.NODE_ENV === "string" ? process.env.NODE_ENV : "staging";

// export corresponding environment object
const environmentToExport =
  typeof environments[currentEnvironment] === "object"
    ? environments[currentEnvironment]
    : environments.staging;

// export module
module.exports = environmentToExport;
