"use strict";

var TurnChoice = require("../turn-choice");

function PlayerTurnBeginState(gameData, choiceProvider, player) {
  function go() {
    return choiceProvider.doTurnChoice(gameData, player)
      .then(handleChoice);
  }
  this.go = go;

  function handleChoice(choice, choiceData) {
    switch (choice) {
      case TurnChoice.DcCard:
        return handleDcCard(choiceData);
      case TurnChoice.BuyCar:
        return handleBuyCar();
      case TurnChoice.BuyInsurance:
        return handleBuyInsurance();
      case TurnChoice.RefreshHand:
        return handleRefresh();
      case TurnChoice.DoNothing:
        return handleNothing();
    }

    throw new Error("Invalid turn choice: " + choice);
  }
}