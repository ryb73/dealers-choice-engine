"use strict";

var nodeUuid = require("node-uuid"),
    assert   = require("./assert");

function Player(startingMoney) {
  var uuid = nodeUuid.v1();
  var money = startingMoney;
  var cars = [];

  function gainCar(car) {
    cars[car.hashCode()] = car;
  }
  this.gainCar = gainCar;

  function loseCar(car) {
    assert(hasCar(car));
    delete cars[car.hashCode()];
  }
  this.loseCar = loseCar;

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

  function hashCode() {
    return uuid;
  }
  this.hashCode = hashCode;
}

module.exports = Player;