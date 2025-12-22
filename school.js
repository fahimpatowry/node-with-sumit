const EventEmitter = require("events"); // it give us a class

class School extends EventEmitter{
  startPeriod() {
    this.emit("bellRing3", {
      period: "first",
      text: "period end! have in other file",
    });
  };
}

module.exports = School;
