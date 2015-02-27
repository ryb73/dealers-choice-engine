"use strict";

var BuyFromAutoExchangeOptions = require("../buy-from-auto-exchange-options");

function buyFromAutoExchange(gameData, choiceProvider, player) {\
  return choiceProvider.chooseBuyFromAutoExchangeOption(player)
    .then(doBuy.bind(null, gameData, player));
}

function doBuy(gameData, player, option) {
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
    case BuyFromAutoExchangeOptions.List:
      return car.listPrice;
    case BuyFromAutoExchangeOptions.FourThou:
      return 4000;
  }

  throw new Error("Invalid replenish option: " + option);
}