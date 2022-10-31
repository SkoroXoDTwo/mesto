import {
  handleLikeClick,
  deleteGalleryItem,
  openPopup,
  popupFullScreenGalleryItem,
  fillPopupFullScreenGalleryItem
} from './index.js';

export class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.gallery__list-element')
      .cloneNode(true);

    return cardElement;
  }

  _setEventListeners() {
    this._likeElement.addEventListener('click', () => { handleLikeClick(this._likeElement); });
    this._trashElement.addEventListener('click', () => { deleteGalleryItem(this._element); });
    this._photoElement.addEventListener('click', () => {
      openPopup(popupFullScreenGalleryItem);
      fillPopupFullScreenGalleryItem(this._link, this._name);
     });
  }

  generateCard() {
    this._element = this._getTemplate();

    this._nameElement = this._element.querySelector('.gallery__name');
    this._photoElement  = this._element.querySelector('.gallery__photo');
    this._likeElement = this._element.querySelector('.gallery__like');
    this._trashElement = this._element.querySelector('.gallery__trash');

    this._nameElement.textContent = this._name;
    this._photoElement.src = this._link;
    this._photoElement.alt = this._name;

    this._setEventListeners();

    return this._element;
  }
}
