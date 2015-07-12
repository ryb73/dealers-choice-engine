"use strict";
/* jshint mocha: true */

const chai           = require("chai"),
      chaiAsPromised = require("chai-as-promised"),
      dcEngine       = require(".."),
      Player         = dcEngine.Player,
      cardTypes      = require("dc-card-interfaces"),
      Insurance      = cardTypes.Insurance,
      Car            = cardTypes.Car,
      DcCard         = cardTypes.DcCard;

chai.use(chaiAsPromised);
const assert = chai.assert;

describe("Player", function() {
  describe("gain", function() {
    it("can take a car", function() {
      let me = new Player(0);
      let car = new Car(1, 1);
      me.gainCar(car);
      assert.ok(me.hasCar(car));
    });

    it("can take a card", function() {
      let me = new Player(0);
      let card = new DcCard();
      me.gainDcCard(card);
      assert.ok(me.hasDcCard(card));
    });

    it("can take an insurance", function() {
      let me = new Player(0);
      let insurance = new Insurance();
      me.gainInsurance(insurance);
      assert.ok(me.hasInsurance(insurance));
    });
  });

  describe("lose", function() {
    it("works with cars", function() {
      let me = new Player(0);
      let car = new Car(1, 1);
      me.gainCar(car);
      me.loseCar(car);
      assert.notOk(me.hasCar(car));
    });

    it("works with dc cards", function() {
      let me = new Player(0);
      let card = new DcCard();
      me.gainDcCard(card);
      me.loseDcCard(card);
      assert.notOk(me.hasDcCard(card));
    });

    it("works with insurance", function() {
      let me = new Player(0);
      let insurance = new Insurance();
      me.gainInsurance(insurance);
      me.loseInsurance(insurance);
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