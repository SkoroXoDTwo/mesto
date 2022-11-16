export class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._popup = document.querySelector(popupSelector);
  }

  open() {
    this._popup.classList.add('popup_opened');
    window.addEventListener('keydown', this._handleEscClose.bind(this));
  }

  close() {
    this._popup.classList.remove('popup_opened');
    window.removeEventListener('keydown', this._handleEscClose.bind(this));
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners() {
    this._popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
        this.close()
      }
      if (evt.target.classList.contains('popup__close-btn')) {
        this.close(this._popup)
      }
    });
  }
}
