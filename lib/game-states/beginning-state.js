"use strict";

var CheckReplenish = require("./check-replenish");

function BeginningState(gameData, choiceProvider) {
  function go() {
    return choiceProvider.rockPaperScissors()
      .then(doNext);
  }
  this.go = go;

  function doNext(order) {
    gameData.order = order;

    var firstPlayer = gameData.players[order[0]];
    return new CheckReplenish(gameData, choiceProvider, firstPlayer);
  }
}

module.exports = BeginningState;