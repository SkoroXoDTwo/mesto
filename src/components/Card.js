export class Card {
  constructor({data, templateSelector, userId, handleBtnDeleteClick, handleCardClick}) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._userId = userId;
    this._ownerId = data.owner._id;
    this._handleCardClick = handleCardClick;
    this._countLikes = data.likes.length;
    this._handleBtnDeleteClick = handleBtnDeleteClick;
    this.id = data._id;
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
    this._likeElement = this._element.querySelector('.gallery__like-btn');
    this._trashElement = this._element.querySelector('.gallery__trash');
    this._countLikesElement = this._element.querySelector('.gallery__like-count');

    this._nameElement.textContent = this._name;
    this._photoElement.src = this._link;
    this._photoElement.alt = this._name;
    this._countLikesElement.textContent = this._countLikes;

    if(!this._isUserOwner()) {
      this._deleteTrashElement();
    }

    this._setEventListeners();

    return this._element;
  }

  _isUserOwner() {
    return this._userId === this._ownerId;
  }

  _deleteTrashElement() {
    this._trashElement.remove();
  }

  _setEventListeners() {
    this._likeElement.addEventListener('click', () => { this._handleLikeClick(); });
    this._trashElement.addEventListener('click', () => { this._handleBtnDeleteClick(); });
    this._photoElement.addEventListener('click', () => { this._handleCardClick()});
  }

  _handleLikeClick() {
    this._likeElement.classList.toggle('gallery__like-btn_active');
  };

  deleteCard() {
    this._element.remove();
    this._element = null;
  };
}
