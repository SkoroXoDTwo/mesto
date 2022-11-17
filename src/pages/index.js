import '../pages/index.css'
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
  handleFormSubmit: (inputsValue) => {
    formValidators['profile-form'].resetValidation();
    userInfo.setUserInfo({
      name: inputsValue['user-name'],
      description: inputsValue['user-description']
    });
    popupFormProfile.close();
  }
});

const popupFormPhoto = new PopupWithForm({
  popupSelector: popupAddPhotoSelector,
  handleFormSubmit: (inputsValue) => {
    renderGalleryItem({
      name: inputsValue['photo-name'],
      link: inputsValue['photo-link']
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
  return card.generateCard();
}

function renderGalleryItem(item) {
  const cardElement = createCard(item);
  galleryCardList.setItem(cardElement);
};

const galleryCardList = new Section({
  containerSelector: galleryListSelector,
  renderer: (item) => {
    renderGalleryItem(item);
  }
});

galleryCardList.renderItems(initialGalleryItems);

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
