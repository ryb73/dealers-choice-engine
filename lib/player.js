"use strict";

const nodeUuid  = require("node-uuid"),
      _         = require("lodash"),
      assert    = require("chai").assert,
      whichIsIt = require("./which-is-it"),
      DcCard    = require("./dc-card"),
      Insurance = require("./insurance"),
      Car       = require("./car");

function Player(startingMoney) {
  let uuid = nodeUuid.v1();
  let money = startingMoney;
  let cars = [];
  let insurances = [];
  let dcCards = [];
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
    cars[car.hashCode()] = car;
  }

  function loseCar(car) {
    assert(hasCar(car));
    delete cars[car.hashCode()];
  }

  function hasCar(car) {
    return !!cars[car.hashCode()];
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
    insurances[insurance.hashCode()] = insurance;
  }

  function loseInsurance(insurance) {
    assert(hasInsurance(insurance));
    delete insurances[insurance.hashCode()];
  }

  function hasInsurance(insurance) {
    return !!insurances[insurance.hashCode()];
  }
  this.hasInsurance = hasInsurance;

  function gainDcCard(card) {
    dcCards[card.hashCode()] = card;
  }

  function loseDcCard(card) {
    assert(!!dcCards[card.hashCode()]);
    delete dcCards[card.hashCode()];
  }

  function hasDcCard(card) {
    return !!dcCards[card.hashCode()];
  }
  this.hasDcCard = hasDcCard;

  Object.defineProperties(this, {
    // TODO: there must be a better way
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
        let result = [];
        for(let key in dcCards)
          result.push(dcCards[key]); // TODO: make hashset class
        return result;
      }
    },

    cars: {
      enumerable: true,
      get: function() {
        return _.clone(cars);
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