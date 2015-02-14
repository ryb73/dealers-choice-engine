"use strict";

var BeginningState = require("./game-states/beginning-state");

function Game(players, decks, choiceProvider) {
  var state = new BeginningState(choiceProvider);

  function doNext() {
    state = state.do();
    return !!state;
  }
}