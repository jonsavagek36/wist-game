

class Card {
  constructor(cardCode, cardImg, cardSuit, cardVal) {
    this.cardCode = cardCode;
    this.cardImg = cardImg;
    this.cardSuit = cardSuit;
    this.cardVal = cardVal;
  }
  appendCard() {
    let handView = document.getElementById("player-hand");
    let imageElement = document.createElement("img");
    imageElement.src = this.cardImg;
    handView.appendChild(imageElement);
  }
}
