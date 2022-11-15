import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._inputsValue = {};
    this._formInputs = this._popup.querySelectorAll('.popup__input');
  }

  open() {
    super.open();
  }

  setInputValue(data) {
    this._formInputs.forEach((input) => {
      input.value = data[input.name];
    });
  }

  _getInputValues() {
    this._formInputs.forEach((input) => {
      const inputName = input.getAttribute('name')
      this._inputsValue[inputName] = input.value;
    });
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('submit', this._handleFormSubmit);
  }
}
