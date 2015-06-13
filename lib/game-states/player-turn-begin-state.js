"use strict";

var _                   = require("lodash"),
    TurnChoice          = require("../turn-choice"),
    AllowSecondDcCard   = require("./allow-second-dc-card"),
    AllowOpenLot        = require("./allow-open-lot"),
    buyFromAutoExchange = require("../actions/buy-from-auto-exchange");

function PlayerTurnBeginState(gameData, choiceProvider, player) {
  function go() {
    return choiceProvider.doTurnChoice(gameData, player)
      .then(handleChoice);
  }
  this.go = go;

  function handleChoice(choice, choiceData) {
    /* jshint maxcomplexity: false */
    switch (choice) {
      case TurnChoice.DcCard:
        return handleDcCard(choiceData); // data is the card
      case TurnChoice.BuyCar:
        return handleBuyCar();
      case TurnChoice.BuyInsurance:
        return handleBuyInsurance();
      case TurnChoice.RefreshHand:
        return handleRefresh();
      case TurnChoice.DoNothing:
        return turnDoneState();
    }

    throw new Error("Invalid turn choice: " + choice);
  }

  function handleDcCard(card) {
    return card.play(player, gameData, choiceProvider)
      .thenResolve(new AllowSecondDcCard(gameData, choiceProvider, player));
  }

  function handleBuyCar() {
    return buyFromAutoExchange(gameData, choiceProvider, player)
      .thenResolve(turnDoneState());
  }

  function handleBuyInsurance() {
    player.gainInsurance(gameData.insuranceDeck.pop());
    player.debit(4000); // TODO: magic number, refactor if necessary
    return turnDoneState();
  }

  function handleRefresh() {
    var numCards = player.dcCards.length;

    // We're going to discard all of the cards and THEN
    // draw new ones because that's how it'd happen in
    // real life
    player.dcCards.forEach(function(card) {
      gameData.dcDeck.discard(card);
      player.lose(card);
    });

    _.times(numCards, function() {
      player.gain(gameData.dcDeck.pop());
    });

    return turnDoneState();
  }

  // Essentially a helper function to return the state that we go to
  // when the player's action turn is done.
  function turnDoneState() {
    // ...which is the "allow open lot" state.
    return new AllowOpenLot(gameData, choiceProvider, player);
  }
}

module.exports = PlayerTurnBeginState;