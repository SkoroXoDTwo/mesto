import "../pages/index.css";
import { Api } from "../components/Api.js";
import { Section } from "../components/Section.js";
import { Card } from "../components/Card.js";
import { UserInfo } from "../components/UserInfo.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { FormValidator } from "../components/FormValidator.js";

import {
  popupPhotoItemSelector,
  popupEditProfileSelector,
  popupAddPhotoSelector,
  profileEditInfoBtn,
  profileAddGalleryItemBtn,
  galleryListSelector,
  formValidators,
  configValidator,
} from "../utils/constants.js";

const api = new Api({
  baseUrl: "https://nomoreparties.co/v1/cohort-55",
  headers: {
    authorization: "5b60ccac-c30f-46d8-b7b2-7f9c7f002bee",
    "Content-Type": "application/json",
  },
});

const userInfo = new UserInfo({
  nameSelector: ".profile__user-name",
  aboutSelector: ".profile__user-about",
});

const popupFullScreenImg = new PopupWithImage({
  popupSelector: popupPhotoItemSelector,
});

const popupFormProfile = new PopupWithForm({
  popupSelector: popupEditProfileSelector,
  handleFormSubmit: (inputsValue) => {
    formValidators["profile-form"].resetValidation();
    userInfo.setUserInfo({
      name: inputsValue["user-name"],
      about: inputsValue["user-about"],
    });
    api.pathUserInfo({
      name: inputsValue["user-name"],
      about: inputsValue["user-about"],
    });
    popupFormProfile.close();
  },
});

const popupFormPhoto = new PopupWithForm({
  popupSelector: popupAddPhotoSelector,
  handleFormSubmit: (inputsValue) => {
    renderGalleryItem({
      name: inputsValue["photo-name"],
      link: inputsValue["photo-link"],
    });
    popupFormPhoto.close();
  },
});

popupFullScreenImg.setEventListeners();
popupFormProfile.setEventListeners();
popupFormPhoto.setEventListeners();

function createCard(item) {
  const card = new Card({
    data: item,
    templateSelector: "#gallery-item-template",
    handleCardClick: () => {
      popupFullScreenImg.open({
        name: card._name,
        link: card._link,
      });
    },
  });
  return card.generateCard();
}

function renderGalleryItem(item) {
  const cardElement = createCard(item);
  galleryCardList.setItem(cardElement);
}

const galleryCardList = new Section({
  containerSelector: galleryListSelector,
  renderer: (item) => {
    renderGalleryItem(item);
  },
});

api
  .getInitialUserInfo()
  .then((result) => {
    userInfo.setUserInfo(result);
  })
  .catch((err) => {
    console.log(err);
  });

api
  .getInitialCards()
  .then((result) => {
    galleryCardList.renderItems(result);
  })
  .catch((err) => {
    console.log(err);
  });

function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator({
      config: config,
      formElement: formElement,
    });
    const formName = formElement.getAttribute("name");
    formValidators[formName] = validator;
    validator.enableValidation();
  });
}

enableValidation(configValidator);

profileEditInfoBtn.addEventListener("click", () => {
  popupFormProfile.setInputValue(userInfo.getUserInfo());
  formValidators["profile-form"].resetValidation();
  popupFormProfile.open();
});

profileAddGalleryItemBtn.addEventListener("click", () => {
  formValidators["card-form"].resetValidation();
  popupFormPhoto.open();
});
