"use strict";
import { Popup } from "./Popup.js";

class PopupImage extends Popup {
  constructor(container) {
    super(container);
  }
  open(link) {
    const popImage = this.popupClass.querySelector('.popup__image');
    popImage.setAttribute('src', link);
    super.open();
  }
}

export { PopupImage };