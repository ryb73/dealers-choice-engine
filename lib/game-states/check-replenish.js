"use strict";

var q                    = require("q"),
    PlayerTurnBeginState = require("./player-turn-begin-state"),
    ReplenishOptions     = require("../replenish-options");

function CheckReplenish(gameData, choiceProvider, player) {
  var self = this;

  function go() {
    if(player.cars.length < 2 && gameData.carDeck.remaining > 0) {
      return choiceProvider.chooseReplenishOption(player)
        .then(doReplenish)
        .then(q(self));
    }

    // No replenish
    return new PlayerTurnBeginState(gameData, choiceProvider, player);
  }

  function doReplenish(option) {
    var car = gameData.carDeck.pop();
    var amount = getCost(option, car);
    if(amount > player.money) {
      throw new Error("Not enough money to replenish!!!"); // TODO: implement
    }

    player.debit(amount);
    player.gainCar(car);
  }

  function getCost(option, car) {
    switch (option) {
      case ReplenishOptions.List:
        return car.listPrice;
      case ReplenishOptions.FourThou:
        return 4000;
    }

    throw new Error("Invalid replenish option: " + option);
  }
}