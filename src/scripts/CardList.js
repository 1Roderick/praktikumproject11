"use strict";
class CardList {
  constructor(container, card) {
    this.container = container
    this.card = card;
  }
  addCard(card) {
    this.container.appendChild(card);
  }
  render(array) {
    array.forEach((item) => {
      this.addCard(this.card(item.name, item.link));
    });
  }
}

export {CardList};