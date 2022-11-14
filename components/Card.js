export class Card {
  constructor(data, templateSelector, openCardGallery) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._openCardGallery = openCardGallery;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.gallery__list-element')
      .cloneNode(true);

    return cardElement;
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

  _setEventListeners() {
    this._likeElement.addEventListener('click', () => { this._handleLikeClick(); });
    this._trashElement.addEventListener('click', () => { this._deleteGalleryItem(); });
    this._photoElement.addEventListener('click', () => {
      this._openCardGallery(this._link, this._name);
     });
  }

  _handleLikeClick() {
    this._likeElement.classList.toggle('gallery__like_active');
  };

  _deleteGalleryItem() {
    this._element.remove();
  };
}
