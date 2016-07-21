"use strict";

const _         = require("lodash"),
      nodeUuid  = require("node-uuid"),
      assert    = require("chai").assert;

function Player(startingMoney) {
  let uuid = nodeUuid.v1();
  let money = startingMoney;
  let cars = {};
  let insurances = {};
  let dcCards = {};
  let blueBook = null;

  function gainCar(car) {
    cars[car.id] = car;
  }
  this.gainCar = gainCar;

  function buyCar(car, amount) {
    doDebit(amount);
    gainCar(car);
  }
  this.buyCar = buyCar;

  function sellCar(car, amount) {
    assert(hasCar(car));

    doCredit(amount);
    delete cars[car.id];
  }
  this.sellCar = sellCar;

  function hasCar(car) {
    return !!cars[car.id];
  }
  this.hasCar = hasCar;

  function credit(amount) { // TODO: remove
    assert(amount > 0);
    doCredit(amount);
  }
  this.credit = credit;

  function doCredit(amount) {
    money += amount;
  }

  function debit(amount) {
    assert(amount > 0);
    doDebit(amount);
  }
  this.debit = debit;

  function doDebit(amount) {
    assert(amount <= money); // might need to change?
    money -= amount;
  }

  function gainInsurance(insurance) {
    insurances[insurance.id] = insurance;
  }
  this.gainInsurance = gainInsurance;

  function buyInsurance(insurance, amount) {
    doDebit(amount);
    gainInsurance(insurance);
  }
  this.buyInsurance = buyInsurance;

  function loseInsurance(insurance) {
    assert(hasInsurance(insurance));
    delete insurances[insurance.id];
  }
  this.loseInsurance = loseInsurance;

  function hasInsurance(insurance) {
    return !!insurances[insurance.id];
  }
  this.hasInsurance = hasInsurance;

  function gainDcCard(card) {
    console.log("gained dc ", card);
    dcCards[card.id] = card;
  }
  this.gainDcCard = gainDcCard;

  function loseDcCard(card) {
    assert(hasDcCard(card));
    delete dcCards[card.id];
  }
  this.loseDcCard = loseDcCard;

  function hasDcCard(card) {
    return !!dcCards[card.id];
  }
  this.hasDcCard = hasDcCard;

  Object.defineProperties(this, {
    id: {
      enumerable: true,
      get: function() {
        return uuid;
      }
    },

    money: {
      enumerable: true,
      get: function() {
        return money;
      },
      set: function(m) {
        money = m;
      }
    },

    dcCards: {
      enumerable: true,
      get: function() {
        return _.clone(dcCards);
      }
    },

    cars: {
      enumerable: true,
      get: function() {
        return _.clone(cars);
      }
    },

    insurances: {
      enumerable: true,
      get: function() {
        return _.clone(insurances);
      }
    },

    blueBook: {
      enumerable: true,
      get: function() {
        return blueBook;
      },
      set: function(value) {
        assert(!blueBook); // only set once
        blueBook = value;
      }
    }
  });
}

module.exports = Player;
