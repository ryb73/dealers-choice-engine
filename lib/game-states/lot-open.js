"use strict";

var Bidding  = require("./bidding"),
    TurnOver = require("./turn-over");

function LotOpen(gameData, choiceProvider, player) {
  function go() {
    return choiceProvider.allowBids(player).then(nextState);
  }
  this.go = go;

  function nextState(car) {
    if(car) {
      var returnState = LotOpen.bind(null, gameData,
                         choiceProvider, player);
      return new Bidding(gameData, choiceProvider, car,
                          returnState);
    } else {
      return new TurnOver(gameData, choiceProvider, player);
    }
  }
}

module.exports = LotOpen;