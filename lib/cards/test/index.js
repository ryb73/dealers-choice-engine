"use strict";
/* jshint mocha: true */

var chai                    = require("chai"),
    chaiAsPromised          = require("chai-as-promised"),
    q                       = require("q"),
    Player                  = require("../../player"),
    GameData                = require("../../game-data"),
    Insurance               = require("../../insurance"),
    Car                     = require("../../car"),
    Attack                  = require("../attack"),
    BuyFromAutoExchangeForN = require("../buy-from-auto-exchange-for-n"),
    Free                    = require("../free");

chai.use(chaiAsPromised);
var assert = chai.assert;

describe("Attack", function() {
  describe("canPlay", function() {
    it("should return true when opponents have cars", function() {
      var me = { cars: [] }; // and I don't
      var gameData = {
        players: [
          me,
          { cars: [ "edsel" ] }
        ]
      };
      assert.ok(new Attack().canPlay(me, gameData));
    });

    it("should return false when opponents don't have cars", function() {
      var me = { cars: [ "lincoln" ] }; // but I do
      var gameData = {
        players: [
          me,
          { cars: [] }
        ]
      };
      assert.notOk(new Attack().canPlay(me, gameData));
    });
  });

  describe("attack", function() {
    it("should revoke the selected car if not blocked", function(done) {
      var victim = new Player(0);
      var me = new Player(0);

      var theCar = new Car(1, 1);
      victim.gain(theCar);

      var gameData = new GameData([ victim, me ]);

      var choiceProvider = {
        chooseOpponentCar: function() { return q(theCar); },
        allowBlockAttack: function() { return q(false); }
      };

      new Attack().play(me, gameData, choiceProvider)
        .then(function() {
          assert.notOk(victim.hasCar(theCar));
          done();
        })
        .catch(done);
    });
  });
});

describe("BuyFromAutoExchangeForN", function() {
  describe("canPlay", function() {
    it("can't be played without enough money", function() {
      var cost = 100;
      var me = new Player(cost - 1);
      var gameData = {
        carDeck: { remaining: 1 }
      };

      var card = new BuyFromAutoExchangeForN(cost);
      assert.notOk(card.canPlay(me, gameData));
    });

    it("can't be played if there are no cars", function() {
      var me = new Player(1000000);
      var gameData = {
        carDeck: { remaining: 0 }
      };

      var card = new BuyFromAutoExchangeForN(1);
      assert.notOk(card.canPlay(me, gameData));
    });

    it("can be played with enough money and a car", function() {
      var cost = 100;
      var me = new Player(cost);
      var gameData = {
        carDeck: { remaining: 1 }
      };

      var card = new BuyFromAutoExchangeForN(cost);
      assert.ok(card.canPlay(me, gameData));
    });
  });

  describe("play", function() {
    it("should should give the player the top car and debit accordingly", function(done) {
      var cost = 100;
      var me = new Player(cost);
      var car = new Car(1, 1);
      var gameData = {
        carDeck: {
          pop: function() { return car; }
        }
      };

      var card = new BuyFromAutoExchangeForN(cost);
      card.play(me, gameData, null)
        .then(function() {
          assert.ok(me.hasCar(car));
          assert.equal(me.money, 0);
          done();
        })
        .catch(done);
    });
  });
});

describe("Free", function() {
  describe("canPlay", function() {
    it("can't be played if there are no insurances", function() {
      var gameData = {
        insuranceDeck: { remaining: 0 }
      };

      assert.notOk(new Free().canPlay({}, gameData));
    });

    it("can be played if there are insurances", function() {
      var gameData = {
        insuranceDeck: { remaining: 1 }
      };

      assert.ok(new Free().canPlay({}, gameData));
    });
  });

  describe("play", function() {
    it("gives the player an insurance", function(done) {
      var me = new Player(0);
      var insurance = new Insurance();
      var gameData = {
        insuranceDeck: {
          pop: function() { return insurance; }
        }
      };

      new Free().play(me, gameData, null)
        .then(function() {
          assert.ok(me.hasInsurance(insurance));
          done();
        })
        .catch(done);
    });
  });
});