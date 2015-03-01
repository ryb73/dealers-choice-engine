"use strict";

function Car(id, listPrice) {
  function hashCode() {
    return id;
  }
  this.hashCode = hashCode;

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