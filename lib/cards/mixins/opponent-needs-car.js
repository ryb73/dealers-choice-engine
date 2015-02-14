"use strict";

module.exports = function canPlay(actingPlayer, gameData) {
  gameData.players.every(function(player) {
    return player === actingPlayer || player.cars.length > 0;
  });
};