"use strict";

const giveUniqueId = require("give-unique-id");

function Insurance(...protections) {
  giveUniqueId(this);

  function hasProtection(protection) {
    return protections.includes(protection);
  }
  this.hasProtection = hasProtection;
}

Insurance.protections = {
    Theft: 1,
    Fire: 2,
    Collision: 3,
    RancidPopcorn: 4
};

module.exports = Insurance;