"use strict";

const BeginningState = require("./game-states/beginning-state"),
      GameData       = require("./game-data");

function Game($players, $deckConfig, $choiceProvider) {
  let choiceProvider, gameData, state;

  function initialize() {
    choiceProvider = $choiceProvider;

    gameData = new GameData($players, $deckConfig);
    state = new BeginningState(gameData, choiceProvider);

    $players = $deckConfig = $choiceProvider = null;
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
        return gameData.players;
      }
    }
  });

  initialize();
}

module.exports = Game;