"use strict";

var _        = require("lodash"),
    nodeUuid = require("node-uuid"),
    Game     = require("./game"),
    Player   = require("./player");

var STARTING_MONEY = 17000;
var MAX_PLAYERS = 6;

function GameFactory($decks, $choiceProvider) {
  var decks, choiceProvider;
  var uuid = nodeUuid.v1();
  var players = {};
  var playerCount = 0;

  function initialize() {
    decks = $decks;
    choiceProvider = $choiceProvider;

    _.forEach(decks, function(deck) {
      deck.shuffle();
    });
  }

  function addPlayer() {
    if(playerCount === MAX_PLAYERS)
      return null;

    var player = new Player(STARTING_MONEY);
    players[player.id] = player;
    ++playerCount;
    return player;
  }
  this.addPlayer = addPlayer;

  function removePlayer(player) {
    if(players[player.id]) {
      delete players[player.id];
      --playerCount;
      return true;
    }

    return false;
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

  Object.defineProperties(this, {
    playerCount: {
      enumerable: true,
      get: function() {
        return playerCount;
      }
    }
  });

  initialize();
  _.fill(arguments, null);
}

module.exports = GameFactory;