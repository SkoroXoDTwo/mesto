import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';

const popupEditProfileInfo = document.querySelector('#popup_profile');
const popupAddGalleryItem = document.querySelector('#popup_gallery');
const popupFullScreenGalleryItem = document.querySelector('#popup_gallery_item');

const popupFullScreenGalleryItemPhoto = popupFullScreenGalleryItem.querySelector('.popup__photo');
const popupFullScreenGalleryItemName = popupFullScreenGalleryItem.querySelector('.popup__photo-name');

const formPopupProfile = popupEditProfileInfo.querySelector('.popup__form');
const formPopupGallery = popupAddGalleryItem.querySelector('.popup__form');

const nameInputProfile = formPopupProfile.querySelector('.popup__input_field_name');
const descriptionInput = formPopupProfile.querySelector('.popup__input_field_description');

const nameInputGallery = formPopupGallery.querySelector('.popup__input_field_name');
const linkInputGallery = formPopupGallery.querySelector('.popup__input_field_link');

const profile = document.querySelector('.profile');
const profileEditInfoBtn = profile.querySelector('.profile__edit-btn');
const profileAddGalleryItemBtn = profile.querySelector('.profile__add-btn');
const nameUser = profile.querySelector('.profile__user-name');
const descriptionUser = profile.querySelector('.profile__user-description');

const gallery = document.querySelector('.gallery__list');

const openedPopup = () => { return document.querySelector('.popup_opened') };

const settingList = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-btn',
  inactiveButtonClass: 'popup__save-btn_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

function openPopup (popup) {
  popup.classList.add('popup_opened');
  window.addEventListener('keydown', closePopupKeyEsc);
};

function closePopup (popup) {
  popup.classList.remove('popup_opened');
  window.removeEventListener('keydown', closePopupKeyEsc);
};

function closePopupKeyEsc (evt) {
  if(evt.key === 'Escape') {
    closePopup(openedPopup());
  }
};

function addListenerClosePopupBtns() {
  const popups = document.querySelectorAll('.popup')

  popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
          closePopup(popup)
      }
      if (evt.target.classList.contains('popup__close-btn')) {
        closePopup(popup)
      }
    });
  });
};

function fillPopupEditProfileInfo () {
  nameInputProfile.value = nameUser.textContent;
  descriptionInput.value = descriptionUser.textContent;
};

function fillPopupAddGalleryItem () {
  formPopupGallery.reset();
};

function fillProfileInfo () {
  nameUser.textContent = nameInputProfile.value;
  descriptionUser.textContent = descriptionInput.value;
};

function fillPopupFullScreenGalleryItem (link, name) {
  popupFullScreenGalleryItemPhoto.src = link;
  popupFullScreenGalleryItemPhoto.alt = name;
  popupFullScreenGalleryItemName.textContent = name;
};

function renderGalleryItem (item) {
    const card = new Card(item, '#gallery-item-template');
    const cardElement = card.generateCard();
    gallery.prepend(cardElement);
};

function renderGallery (containerItem) {
  containerItem.forEach((item) => { renderGalleryItem(item) });
};

function handleLikeClick (item) {
  item.classList.toggle('gallery__like_active');
};

function deleteGalleryItem (item) {
  item.remove();
};

const formPopupProfileValidator = new FormValidator(settingList, formPopupProfile);
formPopupProfileValidator.enableValidation();

const formPopupGalleryValidator = new FormValidator(settingList, formPopupGallery);
formPopupGalleryValidator.enableValidation();

function formProfileSubmitHandler (evt) {
  evt.preventDefault();

  formPopupProfileValidator.clearValidationErrors();
  fillProfileInfo();
  closePopup(popupEditProfileInfo);
};

function formGallerySubmitHandler (evt) {
  evt.preventDefault();

  renderGalleryItem({name: nameInputGallery.value, link: linkInputGallery.value} );
  fillPopupAddGalleryItem();
  formPopupGalleryValidator.clearValidationErrors();
  closePopup(popupAddGalleryItem);
};

renderGallery(initialGalleryItems);
addListenerClosePopupBtns();

profileEditInfoBtn.addEventListener('click', () => {

  fillPopupEditProfileInfo();
  formPopupProfileValidator.clearValidationErrors();
  openPopup(popupEditProfileInfo);
});

profileAddGalleryItemBtn.addEventListener('click', () => {
  openPopup(popupAddGalleryItem);
});

formPopupProfile.addEventListener('submit', formProfileSubmitHandler);
formPopupGallery.addEventListener('submit', formGallerySubmitHandler);

export {
  handleLikeClick,
  deleteGalleryItem,
  openPopup,
  popupFullScreenGalleryItem,
  fillPopupFullScreenGalleryItem
};
