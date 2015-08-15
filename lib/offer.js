"use strict";

const HoodResult = {
  TellingTruth: 1,
  Lying: 2
};

Offer.HoodResult = HoodResult;

function Offer(buyer, seller, car, amount) {
  function accept() {
    buyer.gainCar(car);
    seller.loseCar(car);

    if(amount < 0) {
      buyer.credit(-amount);
      seller.debit(-amount);
    } else {
      buyer.debit(amount);
      seller.credit(amount);
    }
  }
  this.accept = accept;

  function aboveBlueBook() {
    return amount > seller.blueBookPrice(car);
  }

  function lookUnderHood() {
    if(aboveBlueBook()) {
      amount = amount - 2000;
      accept();
      return HoodResult.Lying;
    } else {
      amount = amount + 2000;
      if(buyer.money < amount)
        throw new Error("Buyer bankrupt, oops!"); // TODO: implement

      accept();
      return HoodResult.TellingTruth;
    }
  }
  this.lookUnderHood = lookUnderHood;

  function toJSON() {
    return {
      buyerId: buyer.id,
      sellerId: seller.id,
      carId: car.id,
      amount: amount
    };
  }
  this.toJSON = toJSON;

  Object.defineProperties(this, {
    buyer: {
      enumerable: true,
      get: function() {
        return buyer;
      }
    },
    seller: {
      enumerable: true,
      get: function() {
        return seller;
      }
    },
    car: {
      enumerable: true,
      get: function() {
        return car;
      }
    },
    amount: {
      enumerable: true,
      get: function() {
        return amount;
      }
    }
  });
}

module.exports = Offer;