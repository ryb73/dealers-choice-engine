"use strict";

const nodeUuid  = require("node-uuid"),
      toArray   = require("iterator-to-array"),
      assert    = require("chai").assert;

function Player(startingMoney) {
  let uuid = nodeUuid.v1();
  let money = startingMoney;
  let cars = new Map();
  let insurances = new Map();
  let dcCards = new Map();
  let blueBook = null;

  function gainCar(car) {
    cars.set(car.id, car);
  }
  this.gainCar = gainCar;

  function loseCar(car) {
    assert(hasCar(car));
    cars.delete(car.id);
  }
  this.loseCar = loseCar;

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
  this.gainInsurance = gainInsurance;

  function loseInsurance(insurance) {
    assert(hasInsurance(insurance));
    insurances.delete(insurance.hashCode());
  }
  this.loseInsurance = loseInsurance;

  function hasInsurance(insurance) {
    return !!insurances.has(insurance.hashCode());
  }
  this.hasInsurance = hasInsurance;

  function gainDcCard(card) {
    dcCards.set(card.hashCode(), card);
  }
  this.gainDcCard = gainDcCard;

  function loseDcCard(card) {
    assert(hasDcCard(card));
    dcCards.delete(card.hashCode());
  }
  this.loseDcCard = loseDcCard;

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