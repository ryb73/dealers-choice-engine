"use strict";

var q                    = require("q"),
    PlayerTurnBeginState = require("./player-turn-begin-state"),
    buyFromAutoExchange  = require("../actions/buy-from-auto-exchange");

function CheckReplenish(gameData, choiceProvider, player) {
  var self = this;

  function go() {
    if(player.cars.length < 2 && gameData.carDeck.remaining > 0) {
      return buyFromAutoExchange(gameData, choiceProvider, player)
        .thenResolve(q.bind(self));
    }

    // No replenish
    return q(new PlayerTurnBeginState(gameData,
      choiceProvider, player));
  }
  this.go = go;
}

module.exports = CheckReplenish;