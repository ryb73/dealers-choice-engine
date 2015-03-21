"use strict";

function Offer(buyer, seller, car, amount) {
  function accept() {
    buyer.gain(car);
    buyer.debit(amount);
    seller.lose(car);
    seller.credit(amount);
  }
  this.accept = accept;
}

module.exports = Offer;