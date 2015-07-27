"use strict";

const giveUniqueId = require("give-unique-id");

function Insurance() {
  giveUniqueId(this);
}

module.exports = Insurance;