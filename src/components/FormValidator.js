export class FormValidator {
  constructor({ config, formElement }) {
    this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonSelector = config.inactiveButtonSelector;
    this._inputErrorSelector = config.inputErrorSelector;
    this._errorSelector = config.errorSelector;
    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
  }

  _showInputError(inputElement, errorMessage) {
    this._errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorSelector);
    this._errorElement.textContent = errorMessage;
    this._errorElement.classList.add(this._errorSelector);
  };

  _hideInputError(inputElement) {
    this._errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorSelector);
    this._errorElement.classList.remove(this._errorSelector);
    this._errorElement.textContent = '';
  };

  _checkInputValidity(inputElement) {
    inputElement.validity.valid
      ? this._hideInputError(inputElement)
      : this._showInputError(inputElement, inputElement.validationMessage);
  };

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  _toggleButtonState() {
    if(this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._inactiveButtonSelector);
      this._buttonElement.disabled = true;
    }
    else {
      this._buttonElement.classList.remove(this._inactiveButtonSelector);
      this._buttonElement.disabled = false;
    }
  };

  _setEventListeners() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  };

  enableValidation() {
    this._setEventListeners();
  };

  resetValidation() {
    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  };
}
