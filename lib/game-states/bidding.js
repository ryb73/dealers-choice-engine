"use strict";

var FinalOffer = require("./final-offer");

function Bidding(gameData, choiceProvider, car, AfterSaleState) {
  function go() {
    return choiceProvider.doBidding(car)
      .then(nextState);
  }
  this.go = go;

  function nextState(finalBid) {
    return new FinalOffer(gameData, choiceProvider,
      car, finalBid, AfterSaleState);
  }
}

module.exports = Bidding;