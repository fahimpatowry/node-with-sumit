// dependency
const { error } = require("console");
const fs = require("fs");
const path = require("path");

const lib = {};

// base directory of the data folder
lib.basedir = path.join(__dirname, "/../data/");

// write data to file
lib.create = function (dir, file, data, callback) {
  // open file for writing
  fs.open(
    lib.basedir + dir + "/" + file + ".json",
    "wx",
    (err, fileDescriptor) => {
      if (!err && fileDescriptor) {
        // convert data to string
        const stringData = JSON.stringify(data);

        // wite data to file and then close it
        fs.writeFile(fileDescriptor, stringData, (err2) => {
          if (!err2) {
            fs.close(fileDescriptor, (err3) => {
              if (!err3) {
                callback(false);
              } else {
                callback("Error closing the new file!");
              }
            });
          } else {
            callback("Error writing to new file!");
          }
        });
      } else {
        callback("could not create new file, it may already exists!");
      }
    }
  );
};

// read data from file
lib.read = (dir, file, callback) => {
  fs.readFile(`${lib.basedir + dir}/${file}.json`, "utf8", (err, data) => {
    callback(err, data);
  });
};

// update existing file
lib.update = (dir, file, data, callback) => {
  // file open for writing
  fs.open(
    lib.basedir + dir + "/" + file + ".json",
    "r+",
    (err, fileDescriptor) => {
      if (!err && fileDescriptor) {
        // convert the data to string
        const stringData = JSON.stringify(data);
        console.log("object", data);

        // truncate file
        fs.ftruncate(fileDescriptor, (err2) => {
          if (!err2) {
            fs.writeFile(fileDescriptor, stringData, (err3) => {
              if (!err3) {
                // close file
                fs.close(fileDescriptor, (err4) => {
                  if (err4) {
                    callback(false);
                  } else {
                    callback("error closing file");
                  }
                });
              } else {
                callback("Error writing ot file");
              }
            });
          } else {
            callback("error truncate file");
          }
        });
      } else {
        callback("error updating may to exist");
      }
    }
  );
};

// delete existing file
lib.delete = (dir, file, callback) => {
  fs.unlink(lib.basedir + dir + "/" + file + ".json", (err) => {
    if (!err) {
      callback(false);
    } else {
      callback("Error deleting file");
    }
  });
};

module.exports = lib;
