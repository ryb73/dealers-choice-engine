"use strict";

var _ = require("lodash");

function BlueBook(carPrices) {
  // We don't really want the object that was
  // passed in; we just want the values. This
  // allows the original object to be modified
  // without affecting this blue book.
  carPrices = _.clone(carPrices);

  // Gets the price for the given car
  // Returns undefined if car isn't in blue book
  function getPrice(car) {
    return carPrices[car.id];
  }
  this.getPrice = getPrice;
}

module.exports = BlueBook;