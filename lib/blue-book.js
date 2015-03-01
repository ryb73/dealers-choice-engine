"use strict";

function BlueBook(carPrices) {
  function getPrice(car) {
    return carPrices[car.id];
  }
  this.getPrice = getPrice;
}

module.exports = BlueBook;