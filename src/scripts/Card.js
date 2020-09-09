"use strict";
class Card {
  constructor(name, link, openCallback) {
    this.name = name;
    this.link = link;
    this.openCallback = openCallback;
    this.imageOpening = this.imageOpening.bind(this);
    this.like = this.like.bind(this);
    this.remove = this.remove.bind(this);
  }

  create() {
    const cardContainer = document.createElement('div');
    cardContainer.classList.add('place-card');

    const cardImage = document.createElement('div');
    cardImage.classList.add('place-card__image');
    this.cardImageButton = cardImage;
    cardImage.setAttribute('style', `background-image:url(${this.link}`);

    const cardButtonDelete = document.createElement('button');
    cardButtonDelete.classList.add('place-card__delete-icon');
    this.buttonDelete = cardButtonDelete;

    const cardDescription = document.createElement('div');
    cardDescription.classList.add('place-card__description');

    const cardName = document.createElement('h3');
    cardName.classList.add('place-card__name');
    cardName.textContent = this.name;

    const cardButtonLike = document.createElement('button');
    cardButtonLike.classList.add('place-card__like-icon');
    this.buttonLike = cardButtonLike;

    cardContainer.appendChild(cardImage);
    cardImage.appendChild(cardButtonDelete);
    cardContainer.appendChild(cardDescription);
    cardDescription.appendChild(cardName);
    cardDescription.appendChild(cardButtonLike);
    this.setEventListeners();

    return cardContainer;
  }

  like() {
    this.buttonLike.classList.toggle('place-card__like-icon_liked');
  }

  remove() {
    this.removeEventListeners();
    this.buttonDelete.closest('.place-card').remove();
  }

  imageOpening(event) {
    if (event.target.classList.contains('place-card__image')) {
      this.openCallback(this.link);
    }
  }

  setEventListeners() {
    this.buttonLike.addEventListener('click', this.like);
    this.buttonDelete.addEventListener('click', this.remove);
    this.cardImageButton.addEventListener('click', this.imageOpening);
  }

  removeEventListeners() {
    this.buttonLike.removeEventListener('click', this.like);
    this.buttonDelete.removeEventListener('click', this.remove);
    this.cardImageButton.removeEventListener('click', this.imageOpening);
  }
}

export { Card };
