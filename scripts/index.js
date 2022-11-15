import { Section } from '../components/Section.js';
import { Card } from '../components/Card.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { FormValidator } from '../components/FormValidator.js';

import {
  popupEditProfileInfo,
  popupAddGalleryItem,
  popupFullScreenGalleryItem,
  popupFullScreenGalleryItemPhoto,
  popupFullScreenGalleryItemName,
  formPopupProfile,
  formPopupGallery,
  nameInputProfile,
  descriptionInput,
  nameInputGallery,
  linkInputGallery,
  profileEditInfoBtn,
  profileAddGalleryItemBtn,
  nameUser,
  descriptionUser,
  galleryListSelector,
  initialGalleryItems,
  formValidators,
  config
} from '../utils/constants.js';

function fillPopupEditProfileInfo() {
  nameInputProfile.value = nameUser.textContent;
  descriptionInput.value = descriptionUser.textContent;
};

function fillProfileInfo() {
  nameUser.textContent = nameInputProfile.value;
  descriptionUser.textContent = descriptionInput.value;
};

const popupFullScreenImg = new PopupWithImage('#popup_gallery_item');
popupFullScreenImg.setEventListeners();

function createCard(item) {
  const card = new Card(item, '#gallery-item-template', popupFullScreenImg);
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
    const card = new Card(item, '#gallery-item-template', popupFullScreenImg);
    const cardElement = card.generateCard();
    galleryCardList.setItem(cardElement);
  }
},
  galleryListSelector
);

galleryCardList.renderItems();

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
