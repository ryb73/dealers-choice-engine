"use strict";

const _        = require("lodash"),
      nodeUuid = require("node-uuid"),
      assert   = require("chai").assert,
      Game     = require("./game"),
      Player   = require("./player");

const STARTING_MONEY = 17000;
const MAX_PLAYERS = 6;

let PendingGameStatus = {
  ReadyToStart: 0,
  NotEnoughPlayers: 1
};
GameFactory.PendingGameStatus = PendingGameStatus;

function GameFactory($decks) {
  let decks;
  let uuid = nodeUuid.v1();
  let players = [];

  function initialize() {
    decks = $decks;

    _.forEach(decks, function(deck) {
      deck.shuffle();
    });

    $decks = null;
  }

  function addPlayer() {
    if(players.length === MAX_PLAYERS)
      return null;

    let player = new Player(STARTING_MONEY);
    players.push(player);
    return player;
  }
  this.addPlayer = addPlayer;

  function removePlayer(player) {
    let idx = findPlayerIndex(player);
    if(idx > -1) {
      _.pullAt(players, idx);
      return true;
    }

    return false;
  }
  this.removePlayer = removePlayer;

  function createGame(choiceProvider) {
    assert.equal(status(), PendingGameStatus.ReadyToStart);
    return new Game(players, decks, choiceProvider);
  }
  this.createGame = createGame;

  function status() {
    if(players.length < 2) return PendingGameStatus.NotEnoughPlayers;
    return PendingGameStatus.ReadyToStart;
  }
  this.status = status;

  function hashCode() {
    return uuid;
  }
  this.hashCode = hashCode;

  function findPlayerIndex(player) {
    return _.findIndex(players, "id", player.id);
  }

  Object.defineProperties(this, {
    players: {
      enumerable: true,
      get: function() {
        return _.clone(players);
      }
    }
  });

  initialize();
}

module.exports = GameFactory;