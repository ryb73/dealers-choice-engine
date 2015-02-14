"use strict";

var BeginningState = require("./game-states/beginning-state");

function Game(players, decks, choiceProvider) {
  var gameData, state;

  function initialize() {
    gameData = {
      players: players,
      decks: decks
    };

    state = new BeginningState(gameData, choiceProvider);
  }

  function doNext() {
    return state.go
      .then(function(newState) {
        state = newState;
        return !!state;
      });
  }
  this.doNext = doNext;

  initialize();
}