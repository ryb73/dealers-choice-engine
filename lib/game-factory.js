"use strict";

var _        = require("lodash"),
    nodeUuid = require("node-uuid")
    Game     = require("./game"),
    Player   = require("./player"),;

var STARTING_MONEY = 17000;

function GameFactory($decks, $choiceProvider) {
  var decks, choiceProvider;
  var uuid = nodeUuid.v1();
  var players = {};

  function initialize() {
    var decks = $decks;
    var choiceProvider = $choiceProvider;

    _.forEach(decks, function(deck) {
      deck.shuffle();
    });
  }

  function addPlayer() {
    var player = new Player(STARTING_MONEY);
    players[player.hashCode()] = player;
    return player;
  }
  this.addPlayer = addPlayer;

  function removePlayer(player) {
    delete players[player.hashCode()];
  }
  this.removePlayer = removePlayer;

  function createGame() {
    return new Game(players, decks, choiceProvider);
  }
  this.createGame = createGame;

  function hashCode() {
    return uuid;
  }
  this.hashCode = hashCode;

  initialize();
  _.fill(arguments, null);
}

module.exports = GameFactory;