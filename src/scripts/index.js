"use strict";
import "../pages/index.css";

import { Api } from "./Api.js";
import { UserInfo } from "./UserInfo.js";
import { Card } from "./Card.js";
import { CardList } from "./CardList.js";
import { FormValidator } from "./FormValidator.js";
import { Popup } from "./Popup.js";
import { PopupImage } from "./PopupImage.js";

(function () {
  const serverUrl = NODE_ENV === 'production' ? 'https://nomoreparties.co' : 'http://nomoreparties.co';
  const placesList = document.querySelector('.places-list');
  const popupUserInfo = document.querySelector('.popup__user_info');
  const popupEditInfo = document.querySelector('.popup__edit_info');
  const popupImageOpen = document.querySelector('.popup__image_window');
  const profileName = document.querySelector('.user-info__name');
  const profileJob = document.querySelector('.user-info__job');
  const editInfoButton = document.querySelector('.edit-info__button');
  const userInfoButton = document.querySelector('.user-info__button');

  const validErrors = { emptyField: 'Обязательное поле', shortValue: 'Должно быть от 2 до 30 символов', notLink: 'Здесь должна быть ссылка' };
  const config = {
    url: `${serverUrl}/cohort11`,
    headers: {
      authorization: '1efb2071-c7bb-4609-9050-92d1c90dad3f',
      'Content-Type': 'application/json'
    }
  }

  const addForm = document.forms.new;
  const inputName = addForm.elements.name;
  const inputLink = addForm.elements.link;
  const editForm = document.forms.edit;
  const inputUser = editForm.elements.user;
  const inputAbout = editForm.elements.about;

  const api = new Api(config);
  const addPopup = new Popup(popupUserInfo);
  const editPopup = new Popup(popupEditInfo);
  const cardPopup = new PopupImage(popupImageOpen);
  const cardList = new CardList(placesList, renderCards);
  const editFormValidator = new FormValidator(editForm, validErrors);
  const popupFormValidator = new FormValidator(addForm, validErrors);
  const userInfo = new UserInfo(profileName, profileJob, inputUser, inputAbout);


  function renderCards(name, link) {
    const card = new Card(name, link, openImg);
    return card.create();
  };

  function openImg(url) {
    cardPopup.open(url);
  }

  userInfoButton.addEventListener('click', () => {
    addForm.reset();
    popupFormValidator.resetErrors();
    addPopup.open();
  });

  editInfoButton.addEventListener('click', () => {
    editForm.reset();
    editFormValidator.resetErrors();
    userInfo.getUserInfo();
    editPopup.open();
  });

  editForm.addEventListener('submit', function (event) {
    event.preventDefault();
    api.serverUpdateUserInfo(inputUser.value, inputAbout.value)
      .then(res => {
        console.log(res);
        userInfo.setUserInfo(res.name, res.about);
        userInfo.updateUserInfo();
        editFormValidator.resetErrors();
        editForm.reset();
        editPopup.close();
      })
      .catch((err) => {
        console.log(err);
      });
  });

  addForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const cardContainer = new Card(inputName.value, inputLink.value, openImg);
    cardList.addCard(cardContainer.create());
    popupFormValidator.resetErrors();
    addForm.reset();
    addPopup.close();
  });

  api.getUserInformation()
    .then(res => {
      userInfo.setUserInfo(res.name, res.about);
      userInfo.updateUserInfo();
    })
    .catch((err) => {
      console.log(err);
    });


  api.getInitialCards()
    .then(res => {
      cardList.render(res);
    })
    .catch((err) => {
      console.log(err);
    });

})();