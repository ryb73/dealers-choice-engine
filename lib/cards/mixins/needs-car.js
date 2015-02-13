"use strict";

module.exports = function canPlay(player, gameState) {
  return player.cars.length > 0;
};