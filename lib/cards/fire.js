"use strict";

var _                = require("radysh"),
    needsCar         = require("./mixins/needs-car"),
    opponentNeedsCar = require("./mixins/opponent-needs-car");

function Fire() {
  function playCard(player, gameData, choiceProvider) {
    return choiceProvider.chooseOpponentCar(gameData, player)
      .then(tryBurn.bind(null, gameData, choiceProvider));
  }
  this.playCard = playCard;

  function tryBurn(gameData, choiceProvider, car) {
    return choiceProvider.allowUseAntiFire(gameData, car)
      .then(function(blockBurn) {
        if(!blockBurn) burn(car);
      });
  }

  function burn(car, gameData) {
    gameData.getPlayerWithCar(car).loseCar(car);
  }

  var canPlay = _.all([ needsCar, opponentNeedsCar ]);
  this.canPlay = canPlay;
}