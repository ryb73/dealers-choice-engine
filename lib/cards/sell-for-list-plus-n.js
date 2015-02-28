"use strict";

var needsCar = require("./mixins/needs-car");

function SellForListPlusN(n) {
  function play(player, gameData, choiceProvider) {
    return choiceProvider.chooseOwnCar(gameData, player)
      .then(sellCar.bind(player));
  }
  this.play = play;

  function sellCar(player, car) {
    player.credit(car.listPrice);
    player.loseCar(car);
  }

  var canPlay = needsCar;
  this.canPlay = needsCar;
}

module.exports = SellForListPlusN;