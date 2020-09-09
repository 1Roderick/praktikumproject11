"use strict";
class FormValidator {
  constructor(formVal, validErrors) {
    this.formVal = formVal;
    this.validErrors = validErrors;
    this.inputs = this.formVal.querySelectorAll('.popup__input');
    this.button = this.formVal.querySelector('.button');
    this.setEventListeners();
  }

  checkInputValidity(element) {
    if (element.tagName !== 'INPUT') return true;
    const valid = element.validity;
    if (valid.valid) {
      element.nextElementSibling.textContent = '';
      return true;
    } if (valid.valueMissing) {
      element.nextElementSibling.textContent = this.validErrors.emptyField;
      return false;
    } if (valid.tooShort) {
      element.nextElementSibling.textContent = this.validErrors.shortValue;
      return false;
    } if (valid.typeMismatch && element.type === 'url') {
      element.nextElementSibling.textContent = this.validErrors.notLink;
      return false;
    }
  }

  sendToValidate() {
    const val = Array.from(this.inputs).reduce((timed, elem) => this.checkInputValidity(elem) && timed, true);
    this.setSubmitButtonState(val);
  }

  setSubmitButtonState(condition) {
    if (condition) {
      this.button.removeAttribute('disabled');
    } else
      this.button.setAttribute('disabled', true);
  }

  setEventListeners() {
    this.formVal.addEventListener('input', () => this.sendToValidate());
  }

  resetErrors() {
    const spans = Array.from(this.formVal.querySelectorAll('.form__error'));
    spans.forEach(span => span.textContent = '');
    this.setSubmitButtonState(false);
  }
}

export {FormValidator};