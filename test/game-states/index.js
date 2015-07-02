"use strict";
/* jshint mocha: true */

const chai                 = require("chai"),
      chaiAsPromised       = require("chai-as-promised"),
      q                    = require("q"),
      _                    = require("lodash"),
      mockDeckConfig       = require("../mock-deck-config"),
      dcEngine             = require("../.."),
      Player               = dcEngine.Player,
      Car                  = dcEngine.Car,
      GameData             = require("../../lib/game-data"),
      BeginningState       = require("../../lib/game-states/beginning-state"),
      CheckReplenish       = require("../../lib/game-states/check-replenish"),
      PlayerTurnBeginState = require("../../lib/game-states/player-turn-begin-state");

chai.use(chaiAsPromised);
const assert = chai.assert;

describe("BeginningState", function() {
  describe("go", function() {
    it("goes to CheckReplenish for the first player", function () {
      let players = initPlayers(3);
      let deckConfig = mockDeckConfig(0, 0, 0);
      let gameData = new GameData(players, deckConfig);

      let choiceProvider = {
        rockPaperScissors: function() {
          return q(players[1].id);
        }
      };

      let state = new BeginningState(gameData, choiceProvider);
      return state.go().then(function(newState) {
        assert.instanceOf(newState, CheckReplenish);
        assert.equal(gameData.currentPlayer, players[1].id);
        assert.equal(newState.player, players[1]);
      });
    });
  });
});

describe("CheckReplenish", function() {
  describe("go", function() {
    it("goes to the next state if no need to replenish", function() {
      // Player has two cars -- no need to replenish
      let players = initPlayers(3);
      players[0].gain(new Car(0, 0));
      players[0].gain(new Car(1, 0));

      let deckConfig = mockDeckConfig(0, 0, 2);
      let gameData = new GameData(players, deckConfig);

      let state = new CheckReplenish(gameData, {}, players[0]);
      return state.go().then(function(newState) {
        assert.instanceOf(newState, PlayerTurnBeginState);

      });
    });

    it("goes to the next state if can't replenish", function() {
      let players = initPlayers(3);

      // No cars left in deck -- can't replenish
      let deckConfig = mockDeckConfig(0, 0, 0);
      let gameData = new GameData(players, deckConfig);

      let state = new CheckReplenish(gameData, {}, players[0]);
      return state.go().then(function(newState) {
        assert.instanceOf(newState, PlayerTurnBeginState);

      });
    });
  });
});

function initPlayers(num) {
  let players = [];
  _.times(num, function() {
    players.push(new Player(10000));
  });
  return players;
}