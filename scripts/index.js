import { Section } from '../components/Section.js';
import { Card } from '../components/Card.js';
import { UserInfo } from '../components/UserInfo.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
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

const userInfo = new UserInfo('.profile__user-name', '.profile__user-description');
console.log(userInfo.getUserInfo());

const popupFullScreenImg = new PopupWithImage('#popup_gallery_item');
popupFullScreenImg.setEventListeners();

const popupFormProfile = new PopupWithForm('#popup_profile',
  (evt) => {
    evt.preventDefault();
    popupFormProfile._getInputValues();
    formValidators['profile-form'].resetValidation();
    userInfo.setUserInfo(popupFormProfile._inputsValue['user-name'], popupFormProfile._inputsValue['user-description'])
    popupFormProfile.close();
  }
);
popupFormProfile.setEventListeners();

const popupFormPhoto = new PopupWithForm('#popup_gallery',
  (evt) => {
    evt.preventDefault();
    popupFormPhoto._getInputValues();
    renderGalleryItem({name: popupFormPhoto._inputsValue['photo-name'], link: popupFormPhoto._inputsValue['photo-link']})
    popupFormPhoto.close();
  }
);
popupFormPhoto.setEventListeners();

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

profileEditInfoBtn.addEventListener('click', () => {
  popupFormProfile.setInputValue(userInfo.getUserInfo());
  formValidators['profile-form'].resetValidation();
  popupFormProfile.open();
});

profileAddGalleryItemBtn.addEventListener('click', () => {
  formValidators['card-form'].resetValidation();
  popupFormPhoto.open();
});
