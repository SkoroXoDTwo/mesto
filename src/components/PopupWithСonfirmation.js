import { Popup } from "./Popup.js";

export class PopupWithСonfirmation extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._popupForm = this._popup.querySelector(".popup__form");
    this._btnSubmit = this._popupForm.querySelector(".popup__save-btn");
    this._btnSubmitTextValue = this._btnSubmit.textContent;
    this.cardId = null;
  }

  close() {
    super.close();
  }

  open(card) {
    super.open();
    this.card = card;
  }

  setLoadnigIsBtn(isLoading) {
    if (isLoading) {
      this._btnSubmit.disabled = true;
      this._btnSubmit.textContent = "Удаление...";
    } else {
      this._btnSubmit.disabled = false;
      this._btnSubmit.textContent = this._btnSubmitTextValue;
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this.cardId);
    });
  }
}
