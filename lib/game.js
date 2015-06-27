"use strict";

const _              = require("lodash"),
      BeginningState = require("./game-states/beginning-state"),
      GameData       = require("./game-data");

function Game($players, $decks, $choiceProvider) {
  let players = $players;
  let decks = $decks;
  let choiceProvider = $choiceProvider;
  let gameData, state;

  function initialize() {
    players = $players;
    decks = $decks;
    choiceProvider = $choiceProvider;

    gameData = new GameData(players, decks);
    state = new BeginningState(gameData, choiceProvider);

    $players = $decks = $choiceProvider = null;
  }

  // Returns promise for boolean:
  //  true if game should continue
  //  false if game is over
  function doNext() {
    return state.go()
      .then(function(newState) {
        state = newState;
        return !!state;
      });
  }
  this.doNext = doNext;

  Object.defineProperties(this, {
    players: {
      enumerable: true,
      get: function() {
        return _.clone(players);
      }
    }
  });

  initialize();
}

module.exports = Game;