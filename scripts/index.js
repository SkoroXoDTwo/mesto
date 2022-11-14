import { initialGalleryItems } from './cards.js';
import { Section } from '../components/Section.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';

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

const galleryListSelector = '.gallery__list';
const galleryList = document.querySelector(galleryListSelector);

const findOpenedPopup = () => { return document.querySelector('.popup_opened') };

const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-btn',
  inactiveButtonClass: 'popup__save-btn_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

function openPopup(popup) {
  popup.classList.add('popup_opened');
  window.addEventListener('keydown', closePopupKeyEsc);
};

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  window.removeEventListener('keydown', closePopupKeyEsc);
};

function closePopupKeyEsc(evt) {
  if (evt.key === 'Escape') {
    closePopup(findOpenedPopup());
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

function fillPopupEditProfileInfo() {
  nameInputProfile.value = nameUser.textContent;
  descriptionInput.value = descriptionUser.textContent;
};

function fillProfileInfo() {
  nameUser.textContent = nameInputProfile.value;
  descriptionUser.textContent = descriptionInput.value;
};

function fillPopupFullScreenGalleryItem(link, name) {
  popupFullScreenGalleryItemPhoto.src = link;
  popupFullScreenGalleryItemPhoto.alt = name;
  popupFullScreenGalleryItemName.textContent = name;
};

function openCardGallery(link, name) {
  fillPopupFullScreenGalleryItem(link, name);
  openPopup(popupFullScreenGalleryItem);
}

function createCard(item) {
  const card = new Card(item, '#gallery-item-template', openCardGallery);
  const cardElement = card.generateCard();
  return cardElement;
}

function renderGalleryItem(item) {
  const cardElement = createCard(item)
  galleryCardList.setItem(cardElement);
};

const galleryCardList = new Section({
  items: initialGalleryItems,
  renderer: (item) => {
    const card = new Card(item, '#gallery-item-template', openCardGallery);
    const cardElement = card.generateCard();
    galleryCardList.setItem(cardElement);
  }
},
  galleryListSelector
);

galleryCardList.renderItems();

const formValidators = {};

function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector))
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement)
    const formName = formElement.getAttribute('name')
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(config);

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  formValidators['profile-form'].resetValidation();
  fillProfileInfo();
  closePopup(popupEditProfileInfo);
};

function handleGalleryFormSubmit(evt) {
  evt.preventDefault();

  renderGalleryItem({ name: nameInputGallery.value, link: linkInputGallery.value });
  evt.target.reset()
  formValidators['card-form'].resetValidation();
  closePopup(popupAddGalleryItem);
};

addListenerClosePopupBtns();

profileEditInfoBtn.addEventListener('click', () => {
  fillPopupEditProfileInfo();
  formValidators['profile-form'].resetValidation();
  openPopup(popupEditProfileInfo);
});

profileAddGalleryItemBtn.addEventListener('click', () => {
  openPopup(popupAddGalleryItem);
});

formPopupProfile.addEventListener('submit', handleProfileFormSubmit);
formPopupGallery.addEventListener('submit', handleGalleryFormSubmit);
