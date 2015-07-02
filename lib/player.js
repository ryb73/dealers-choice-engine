"use strict";

const nodeUuid  = require("node-uuid"),
      toArray   = require("iterator-to-array"),
      assert    = require("chai").assert,
      whichIsIt = require("./which-is-it"),
      DcCard    = require("./dc-card"),
      Insurance = require("./insurance"),
      Car       = require("./car");

function Player(startingMoney) {
  let uuid = nodeUuid.v1();
  let money = startingMoney;
  let cars = new Map();
  let insurances = new Map();
  let dcCards = new Map();
  let blueBook = null;

  function gain(item) {
    switch(whichIsIt(item, [ DcCard, Insurance, Car ])) {
      case Car:
        return gainCar(item);
      case DcCard:
        return gainDcCard(item);
      case Insurance:
        return gainInsurance(item);
    }

    throw new Error("Invalid argument to Player.gain: " + item);
  }
  this.gain = gain;

  function lose(item) {
    switch(whichIsIt(item, [ DcCard, Insurance, Car ])) {
      case Car:
        return loseCar(item);
      case DcCard:
        return loseDcCard(item);
      case Insurance:
        return loseInsurance(item);
    }

    throw new Error("Invalid argument to Player.lose: " + item);
  }
  this.lose = lose;

  function gainCar(car) {
    cars.set(car.id, car);
  }

  function loseCar(car) {
    assert(hasCar(car));
    cars.delete(car.id);
  }

  function hasCar(car) {
    return !!cars.has(car.id);
  }
  this.hasCar = hasCar;

  function credit(amount) {
    assert(amount > 0);
    money += amount;
  }
  this.credit = credit;

  function debit(amount) {
    assert(amount > 0);
    assert(amount <=  money); // might need to change?
    money -= amount;
  }
  this.debit = debit;

  function gainInsurance(insurance) {
    insurances.set(insurance.hashCode(), insurance);
  }

  function loseInsurance(insurance) {
    assert(hasInsurance(insurance));
    insurances.delete(insurance.hashCode());
  }

  function hasInsurance(insurance) {
    return !!insurances.has(insurance.hashCode());
  }
  this.hasInsurance = hasInsurance;

  function gainDcCard(card) {
    dcCards.set(card.hashCode(), card);
  }

  function loseDcCard(card) {
    assert(hasDcCard(card));
    dcCards.delete(card.hashCode());
  }

  function hasDcCard(card) {
    return !!dcCards.has(card.hashCode());
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
      }
    },

    dcCards: {
      enumerable: true,
      get: function() {
        return toArray(dcCards.values());
      }
    },

    cars: {
      enumerable: true,
      get: function() {
        return toArray(cars.values());
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