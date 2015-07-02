"use strict";
/* jshint mocha: true */

const chai           = require("chai"),
      chaiAsPromised = require("chai-as-promised"),
      _              = require("lodash"),
      mockDeckConfig = require("./mock-deck-config"),
      dcEngine       = require(".."),
      Player         = dcEngine.Player,
      Insurance      = dcEngine.Insurance,
      Car            = dcEngine.Car,
      DcCard         = dcEngine.DcCard,
      GameFactory    = dcEngine.GameFactory,
      Game           = require("../lib/game");

chai.use(chaiAsPromised);
const assert = chai.assert;

describe("Player", function() {
  describe("gain", function() {
    it("can take a car", function() {
      let me = new Player(0);
      let car = new Car(1, 1);
      me.gain(car);
      assert.ok(me.hasCar(car));
    });

    it("can take a card", function() {
      let me = new Player(0);
      let card = new DcCard();
      me.gain(card);
      assert.ok(me.hasDcCard(card));
    });

    it("can take an insurance", function() {
      let me = new Player(0);
      let insurance = new Insurance();
      me.gain(insurance);
      assert.ok(me.hasInsurance(insurance));
    });
  });

  describe("lose", function() {
    it("works with cars", function() {
      let me = new Player(0);
      let car = new Car(1, 1);
      me.gain(car);
      me.lose(car);
      assert.notOk(me.hasCar(car));
    });

    it("works with dc cards", function() {
      let me = new Player(0);
      let card = new DcCard();
      me.gain(card);
      me.lose(card);
      assert.notOk(me.hasDcCard(card));
    });

    it("works with insurance", function() {
      let me = new Player(0);
      let insurance = new Insurance();
      me.gain(insurance);
      me.lose(insurance);
      assert.notOk(me.hasInsurance(insurance));
    });
  });

  describe("credit", function() {
    it("gives money", function() {
      let me = new Player(0);
      me.credit(55);
      assert.equal(me.money, 55);
    });

    it("doesn't take negatives", function() {
      let me = new Player(0);
      assert.throws(me.credit.bind(null, -1));
    });
  });

  describe("debit", function() {
    it("takes money", function() {
      let me = new Player(100);
      me.debit(25);
      assert.equal(me.money, 75);
    });
  });
});

describe("GameFactory", function() {
  let factory;

  beforeEach(function() {
    factory = new GameFactory(mockDeckConfig(0, 0, 0));
  });

  afterEach(function() {
    factory = null;
  });

  describe("addPlayer", function() {
    it("adds a player", function() {
      let player = factory.addPlayer();
      assert.ok(player);
      assert.equal(player, factory.players[0]);
    });

    it("doesn't go above the max number of players", function() {
      _.times(6, factory.addPlayer);
      assert.notOk(factory.addPlayer());
      assert.equal(factory.players.length, 6);
    });
  });

  describe("removePlayer", function() {
    it("removes the specified player", function() {
      let player = factory.addPlayer();
      assert.ok(factory.removePlayer(player));
      assert.equal(factory.players.length, 0);
    });

    it("doesn't remove a player that's not there", function() {
      factory.addPlayer();
      assert.notOk(factory.removePlayer(new Player(0)));
      assert.equal(factory.players.length, 1);
    });
  });

  describe("createGame", function() {
    it("doesn't start the game if it's not ready", function() {
      factory.addPlayer();
      assert.throws(factory.createGame.bind(null, {}));
    });

    it("creates a game instance if it is ready", function() {
      _.times(2, factory.addPlayer);
      assert.instanceOf(factory.createGame({}), Game);
    });
  });
});