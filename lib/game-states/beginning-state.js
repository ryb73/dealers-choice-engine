"use strict";

var PlayerTurnBeginState = require("player-turn-begin-state");

function BeginningState(gameData, choiceProvider) {
  function go() {
    choiceProvider.rockPaperScissors()
      .then(doNext);
  }
  this.go = go;

  function doNext(order) {
    gameData.order = order;

    var firstPlayer = gameData.players[order[0]];
    return new PlayerTurnBeginState(firstPlayer);
  }
}