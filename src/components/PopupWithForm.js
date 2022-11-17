import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._popupForm = this._popup.querySelector('.popup__form');
    this._inputsValue = {};
    this._formInputs = this._popup.querySelectorAll('.popup__input');
  }

  close() {
    super.close();
    this._popupForm.reset();
  }

  setInputValue(data) {
    this._formInputs.forEach((input) => {
      input.value = data[input.name];
    });
  }

  _getInputValues() {
    this._formInputs.forEach((input) => {
      const inputName = input.getAttribute('name');
      this._inputsValue[inputName] = input.value;
    });
    return this._inputsValue;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }
}
