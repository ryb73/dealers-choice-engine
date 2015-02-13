"use strict";

var needsCar = require("./mixins/needs-car");

function SellForBlueBookPlusN(n) {
  function playCard(player, gameState, choiceProvider) {
    choiceProvider.chooseOwnCar(gameState, player)
      .then(sellCar.bind(player));
  }
  this.playCard = playCard;

  function sellCar(player, car) {
    if(!car) return; // user cancelled/no car chosen

    player.credit(player.blueBook.getPrice(car));
    player.loseCar(car);
  }

  var canPlay = needsCar;
  this.canPlay = canPlay;
}

module.exports = SellForBlueBookPlusN;