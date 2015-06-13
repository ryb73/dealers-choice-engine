"use strict";

var _              = require("lodash"),
    BeginningState = require("./game-states/beginning-state"),
    GameData       = require("./game-data");

function Game($players, $decks, $choiceProvider) {
  var players = $players;
  var decks = $decks;
  var choiceProvider = $choiceProvider;
  var gameData, state;

  function initialize() {
    gameData = new GameData(players, decks);

    state = new BeginningState(gameData, choiceProvider);
  }

  function doNext() {
    return state.go()
      .then(function(newState) {
        state = newState;
        return !!state;
      });
  }
  this.doNext = doNext;

  initialize();
  _.fill(arguments, null);
}

module.exports = Game;