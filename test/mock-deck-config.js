"use strict";

const dcEngine = require(".."),
      Car      = dcEngine.Car;

function mockDeckConfig(dcCards, insurances, cars) {
  let deckConfig = {
    dcDeck: [{
      constructor: function() {},
      args: [],
      count: dcCards
    }],

    insuranceDeck: [{
      constructor: function() {},
      args: [],
      count: insurances
    }],

    carDeck: [{
      constructor: Car,
      args: [ 0, 1000 ],
      count: cars
    }]
  };

  return deckConfig;
}

module.exports = mockDeckConfig;