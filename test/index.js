"use strict";
/* jshint mocha: true */

var chai           = require("chai"),
    chaiAsPromised = require("chai-as-promised"),
    q              = require("q"),
    dcEngine       = require(".."),
    Player         = dcEngine.Player,
    GameData       = dcEngine.GameData,
    Insurance      = dcEngine.Insurance,
    Car            = dcEngine.Car,
    BlueBook       = dcEngine.BlueBook,
    DcCard         = dcEngine.DcCard;

chai.use(chaiAsPromised);
var assert = chai.assert;

describe("Player", function() {
  describe("gain", function() {
    it("can take a car", function() {
      var me = new Player(0);
      var car = new Car(1, 1);
      me.gain(car);
      assert.ok(me.hasCar(car));
    });

    it("can take a card", function() {
      var me = new Player(0);
      var card = new DcCard();
      me.gain(card);
      assert.equal(me.dcCards.length, 1);
    });

    it("can take an insurance", function() {
      var me = new Player(0);
      var insurance = new Insurance();
      me.gain(insurance);
      assert.equal(me.insurances.length, 1);
    });
  });
});