"use strict";

var needsCar = require("./mixins/needs-car");

function SellForListPlusN(n) {
  function playCard(player, gameState, choiceProvider) {
    choiceProvider.chooseOwnCar(gameState, player)
      .then(sellCar.bind(player));
  }
  this.playCard = playCard;

  function sellCar(player, car) {
    player.credit(car.listPrice);
    player.loseCar(car);
  }

  var canPlay = needsCar;
  this.canPlay = needsCar;
}

module.exports = SellForListPlusN;