"use strict";

function Car(id, listPrice) {
  Object.defineProperties(this, {
    listPrice: {
      enumerable: true,
      value: listPrice
    },

    id: {
      enumerable: true,
      value: id
    }
  });
}

module.exports = Car;