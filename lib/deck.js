"use strict";

const _         = require("lodash"),
      bindArray = require("bind-array"),
      log       = require("rpb-logging")("dc-engine"),
      assert    = require("chai").assert;

function Deck($cardSelection) {
  let deck = [];
  let discardPile = [];

  function initialize() {
    $cardSelection.forEach(generateCards);
    shuffle();

    $cardSelection = null;
  }

  function generateCards(cardMetadata) {
    let Card = bindArray(cardMetadata.constructor, null, cardMetadata.args);
    _.times(cardMetadata.count, function() {
      let card = new Card();
      card = Object.assign(card, cardMetadata.additionalProperties);
      discardPile.push(card);
    });
  }

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
    // pile is empty too. This shouldn't be too bad

    // shouldn't shuffle if there are still cards
    assert.equal(deck.length, 0);

    deck = _.shuffle(discardPile);
    discardPile = [];
  }
  this.shuffle = shuffle;

  function pickCard(key) {
    let cardIdx = _.findIndex(deck, { key });
    if(cardIdx < 0)
      throw new Error("key not found: " + key);

    return deck.splice(cardIdx, 1)[0];
  }
  this.pickCard = pickCard;

  Object.defineProperties(this, {
    remaining: {
      enumerable: true,
      get: function() { return deck.length; }
    }
  });

  initialize();
}

module.exports = Deck;
