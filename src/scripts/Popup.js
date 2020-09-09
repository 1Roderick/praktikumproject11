"use strict";
class Popup {
  constructor(popupClass) {
    this.popupClass = popupClass;
    this.closeButton = this.popupClass.querySelector('.popup__close');
    this.setEventListeners();
  }

  open() {
    this.popupClass.classList.add('popup_is-opened');
  }

  close() {
    this.popupClass.classList.remove('popup_is-opened');
  }

  setEventListeners() {
    this.closeButton.addEventListener('click', () => {
      this.close();
    });
  }
}

export { Popup };