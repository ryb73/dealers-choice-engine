"use strict";

var chai                    = require("chai"),
    chaiAsPromised          = require("chai-as-promised"),
    q                       = require("q"),
    Attack                  = require("../attack"),
    Player                  = require("../../player"),
    GameData                = require("../../game-data"),
    BuyFromAutoExchangeForN = require("../buy-from-auto-exchange-for-n");

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

      var theCar = {
        listPrice: 1,
        hashCode: function() { return 1; }
      };
      victim.gainCar(theCar);

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