"use strict";

var _      = require("lodash"),
    assert = require("./assert");

function DcDeck(cards) {
  var deck = [];
  var discardPile = _.clone(cards);

  function discard(card) {
    discardPile.push(card);
  }
  this.discard = discard;

  function pop() {
    if(deck.length === 0) shuffle();
    return deck.pop();
  }
  this.pop = pop;

  function shuffle() {
    // We're going to ignore the case where the discard
    // pile is empty too. This would be kind of bad but
    // the show will go on, and it's a super edge case anyway.
    assert(deck.length === 0);
    deck = _.shuffle(discardPile);
    discardPile = [];
  }
  this.shuffle = shuffle;

  Object.defineProperties(this, {
    remaining: {
      enumerable: true,
      get: function() { return deck.length; }
    }
  });
}