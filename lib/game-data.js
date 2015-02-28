"use strict";

function GameData(players, decks) {
  function getPlayerWithCar(car) {
    for(var player in players) {
      if(players[player].hasCar(car)) return players[player];
    }

    return null;
  }
  this.getPlayerWithCar = getPlayerWithCar;
}

module.exports = GameData;