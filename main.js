

// let Deck = require("./Deck.js");
// let Hand = require("./Hand.js");
// let Card = require("./Card.js");

let startButton = document.getElementById("start-button");

let newDeck = new Deck();
let newHand = [];

let ready = () => {
  return new Promise((resolve, reject) => {
    document.onreadystatechange = () => {
      if(document.readyState != "loading") {
        resolve();
      }
    }
  })
}

ready().then(() => {
  fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
    .then(response => {
      if(response.ok) {
        return response;
      } else {
        let errMsg = "Deck not shuffled";
        error = new Error(errMsg);
        throw(error);
      }
    })
    .then(response => response.json())
    .then(deck => {
      console.log(deck);
      newDeck.id = deck.deck_id;
    })
})

let drawPlayerHand = (deck) => {
  fetch(`https://deckofcardsapi.com/api/deck/${newDeck.id}/draw/?count=13`)
    .then(response => {
      if(response.ok) {
        return response;
      } else {
        let errMsg = "Player-hand not drawn";
        error = new Error(errMsg);
        throw(error);
      }
    })
    .then(response => response.json())
    .then(pHand => {
      console.log(pHand);
      console.log(pHand.cards);
      newDeck.remaining = pHand.remaining;
      newDeck.shuffled = pHand.shuffled;
      let cards = pHand.cards;
      cards.forEach((card) => {
        let code = card.code;
        let img = card.image;
        let suit = card.suit;
        let value = card.value;
        newHand.push(new Card(code, img, suit, value));
        let mainD = document.getElementById("player-hand");
        let imgElement = document.createElement("img");
        imgElement.src = img;
        imgElement.className = "cardImg";
        mainD.append(imgElement);
      })
    })
}

startButton.addEventListener("click", function(newHand) {
  drawPlayerHand(newDeck);
  let hand = newHand;
  console.log(hand[0].cardImg);
});

// let playerDiv = document.getElementById("player-hand");
// let cardSpan = document.createElement("span");
// cardSpan.innerHTML = `<img src='${newHand[0].cardImg}'>`;
// playerDiv.appendChild(cardSpan);
