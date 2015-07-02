"use strict";

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
      constructor: function() {},
      args: [],
      count: cars
    }]
  };

  return deckConfig;
}

module.exports = mockDeckConfig;