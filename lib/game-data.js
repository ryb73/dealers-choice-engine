"use strict";

const Deck = require("./deck");

function GameData($players, $deckConfig) {
  let players, dcDeck, insuranceDeck, carDeck;

  function initialize() {
    players = $players;

    dcDeck = new Deck($deckConfig.dcDeck);
    insuranceDeck = new Deck($deckConfig.insuranceDeck);
    carDeck = new Deck($deckConfig.carDeck);

    $players = $deckConfig = null;
  }

  function getPlayerWithCar(car) {
    let player = null;
    players.forEach(function(p) {
      if(p.hasCar(car)) player = p;
    });

    return player;
  }
  this.getPlayerWithCar = getPlayerWithCar;

  Object.defineProperties(this, {
    players: {
      enumerable: true,
      get: function() {
        return players;
      }
    },

    carDeck: {
      enumerable: true,
      get: function() {
        return carDeck;
      }
    },

    insuranceDeck: {
      enumerable: true,
      get: function() {
        return insuranceDeck;
      }
    },

    dcDeck: {
      enumerable: true,
      get: function() {
        return dcDeck;
      }
    }
  });

  initialize();
}

module.exports = GameData;