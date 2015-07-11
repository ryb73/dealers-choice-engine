"use strict";

var BuyFromAutoExchangeOption = require("../buy-from-auto-exchange-option");

function buyFromAutoExchange(gameData, choiceProvider, player) {
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
  player.gain(car);
}

function getCost(option, car) {
  switch (option) {
    case BuyFromAutoExchangeOption.List:
      return car.listPrice;
    case BuyFromAutoExchangeOption.FourThou:
      return 4000;
  }

  throw new Error("Invalid replenish option: " + option);
}

module.exports = buyFromAutoExchange;