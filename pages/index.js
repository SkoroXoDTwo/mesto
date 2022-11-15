import { Section } from '../components/Section.js';
import { Card } from '../components/Card.js';
import { UserInfo } from '../components/UserInfo.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { FormValidator } from '../components/FormValidator.js';

import {
  popupPhotoItemSelector,
  popupEditProfileSelector,
  popupAddPhotoSelector,
  profileEditInfoBtn,
  profileAddGalleryItemBtn,
  galleryListSelector,
  initialGalleryItems,
  formValidators,
  configValidator
} from '../utils/constants.js';

const userInfo = new UserInfo({
  nameSelector: '.profile__user-name',
  descriptionSelector: '.profile__user-description'
});

const popupFullScreenImg = new PopupWithImage({
  popupSelector: popupPhotoItemSelector
});

const popupFormProfile = new PopupWithForm({
  popupSelector: popupEditProfileSelector,
  handleFormSubmit: (evt) => {
    evt.preventDefault();
    popupFormProfile._getInputValues();
    formValidators['profile-form'].resetValidation();
    userInfo.setUserInfo({
      name: popupFormProfile._inputsValue['user-name'],
      description: popupFormProfile._inputsValue['user-description']
    });
    popupFormProfile.close();
  }
});

const popupFormPhoto = new PopupWithForm({
  popupSelector: popupAddPhotoSelector,
  handleFormSubmit: (evt) => {
    evt.preventDefault();
    popupFormPhoto._getInputValues();
    renderGalleryItem({
      name: popupFormPhoto._inputsValue['photo-name'],
      link: popupFormPhoto._inputsValue['photo-link']
    })
    popupFormPhoto.close();
  }
});

popupFullScreenImg.setEventListeners();
popupFormProfile.setEventListeners();
popupFormPhoto.setEventListeners();

function createCard(item) {
  const card = new Card({
    data: item,
    templateSelector: '#gallery-item-template',
    handleCardClick: () => {
      popupFullScreenImg.open({
        name: card._name,
        link: card._link
      });
    }
  });
  const cardElement = card.generateCard();
  galleryCardList.setItem(cardElement);
}

function renderGalleryItem(item) {
  createCard(item);
};

const galleryCardList = new Section({
  items: initialGalleryItems,
  renderer: (item) => {
    createCard(item);
  }
},
  galleryListSelector
);

galleryCardList.renderItems();

function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator({
      config: config,
      formElement: formElement
    });
    const formName = formElement.getAttribute('name');
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(configValidator);

profileEditInfoBtn.addEventListener('click', () => {
  popupFormProfile.setInputValue(userInfo.getUserInfo());
  formValidators['profile-form'].resetValidation();
  popupFormProfile.open();
});

profileAddGalleryItemBtn.addEventListener('click', () => {
  formValidators['card-form'].resetValidation();
  popupFormPhoto.open();
});
