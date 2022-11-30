export class Card {
  constructor({
    data,
    templateSelector,
    userId,
    handleDeleteBtnClick,
    handleLikeBtnClick,
    handleCardClick,
  }) {
    this.name = data.name;
    this.link = data.link;
    this.likes = data.likes;
    this._ownerId = data.owner._id;
    this.id = data._id;
    this._templateSelector = templateSelector;
    this._userId = userId;
    this._handleCardClick = handleCardClick;
    this._handleDeleteBtnClick = handleDeleteBtnClick;
    this._handleLikeBtnClick = handleLikeBtnClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".gallery__list-element")
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();

    this._nameElement = this._element.querySelector(".gallery__name");
    this._photoElement = this._element.querySelector(".gallery__photo");
    this._likeElement = this._element.querySelector(".gallery__like-btn");
    this._trashElement = this._element.querySelector(".gallery__trash");
    this._countLikesElement = this._element.querySelector(
      ".gallery__like-count"
    );

    this._nameElement.textContent = this.name;
    this._photoElement.src = this.link;
    this._photoElement.alt = this.name;

    this.renderLikeContainer();

    if (!this._isUserOwner()) {
      this._deleteTrashElement();
    }

    this._setEventListeners();
    return this._element;
  }

  renderLikeContainer() {
    this._countLikesElement.textContent = this.likes.length;

    this.isUserLiked()
      ? this._likeElement.classList.add("gallery__like-btn_active")
      : this._likeElement.classList.remove("gallery__like-btn_active");
  }

  isUserLiked() {
    return this.likes.some((item) => {
      return item._id === this._userId;
    });
  }

  _isUserOwner() {
    return this._userId === this._ownerId;
  }

  _deleteTrashElement() {
    this._trashElement.remove();
  }

  _setEventListeners() {
    this._likeElement.addEventListener("click", () => {
      this._handleLikeBtnClick();
    });
    this._trashElement.addEventListener("click", () => {
      this._handleDeleteBtnClick();
    });
    this._photoElement.addEventListener("click", () => {
      this._handleCardClick();
    });
  }

  deleteCard() {
    this._element.remove();
    this._element = null;
  }
}
