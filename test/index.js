"use strict";
/* jshint mocha: true */

const chai           = require("chai"),
      chaiAsPromised = require("chai-as-promised"),
      dcEngine       = require(".."),
      Player         = dcEngine.Player,
      Insurance      = dcEngine.Insurance,
      Car            = dcEngine.Car,
      DcCard         = dcEngine.DcCard,
      BlankCard      = require("./blank-card");

chai.use(chaiAsPromised);
const assert = chai.assert;

describe("Player", function() {
  describe("buy", function() {
    it("can buy a car", function() {
      let me = new Player(100);
      let car = new Car(1, 1);
      me.buyCar(car, 100);
      assert.ok(me.hasCar(car));
      assert.equal(me.money, 0);
    });

    it("can buy an insurance", function() {
      let me = new Player(100);
      let insurance = new Insurance();
      me.buyInsurance(insurance, 100);
      assert.ok(me.hasInsurance(insurance));
      assert.equal(me.money, 0)
    });
  });

  describe("gain", function() {
    it("can take a card", function() {
      let me = new Player(0);
      let card = new DcCard();
      me.gainDcCard(card);
      assert.ok(me.hasDcCard(card));
    });
  });

  describe("sell", function() {
    it("works with cars", function() {
      let me = new Player(0);
      let car = new Car(1, 1);
      me.buyCar(car, 0);
      me.sellCar(car, 100);
      assert.notOk(me.hasCar(car));
      assert.equal(me.money, 100);
    });
  });

  describe("lose", function() {
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
      me.buyInsurance(insurance, 0);
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

describe("DcCard", function() {
  it("removes itself from the player's hand when played", function() {
    let card = new BlankCard();
    let player = new Player(10000);
    player.gainDcCard(card);
    card.play({}, {}, player);
    assert.equal(player.dcCards.length, 0);
  });
});