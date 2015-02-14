"use strict";

var _                = require("radysh"),
    needsCar         = require("./mixins/needs-car"),
    opponentNeedsCar = require("./mixins/opponent-needs-car");

function Attack(attackType) {
  function playCard(player, gameData, choiceProvider) {
    return choiceProvider.chooseOpponentCar(gameData, player)
      .then(tryAttack.bind(null, gameData, choiceProvider));
  }
  this.playCard = playCard;

  function tryAttack(gameData, choiceProvider, car) {
    return choiceProvider.allowBlockAttack(gameData, attackType, car)
      .then(function(blockAttack) {
        if(!blockAttack) attack(car);
      });
  }

  function attack(car, gameData) {
    gameData.getPlayerWithCar(car).loseCar(car);
  }

  var canPlay = _.all([ needsCar, opponentNeedsCar ]);
  this.canPlay = canPlay;
}

Attack.attackTypes = {
  fire: 1,
  theft: 2,
  collision: 3,
  rancidPopcorn: 4
};

module.exports = Attack;