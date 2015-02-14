"use strict";

var _      = require("lodash"),
    Game   = require("./game"),
    Player = require("./player");

var STARTING_MONEY = 17000;

function GameFactory(decks, choiceProvider) {
  var players = {};

  function initialize() {
    _.forEach(decks, function(deck) {
      deck.shuffle();
    });
  }

  function addPlayer() {
    var player = new Player(STARTING_MONEY);
    players[player.hashCode()] = player;
    return player;
  }

  function removePlayer(player) {
    delete players[player.hashCode()];
  }

  function createGame() {
    return new Game(players, decks, choiceProvider);
  }

  initialize();
}