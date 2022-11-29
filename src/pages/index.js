import "../pages/index.css";
import { Api } from "../components/Api.js";
import { Section } from "../components/Section.js";
import { Card } from "../components/Card.js";
import { UserInfo } from "../components/UserInfo.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithСonfirmation } from "../components/PopupWithСonfirmation.js";
import { FormValidator } from "../components/FormValidator.js";

let userId = null;

import {
  popupPhotoItemSelector,
  popupEditProfileSelector,
  popupAddPhotoSelector,
  popupEditAvatarSelector,
  popupDeleteItemSelector,
  profileEditInfoBtn,
  profileAddGalleryItemBtn,
  profileEditAvatarBtn,
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
  avatarSelector: ".profile__picture",
});

const popupFullScreenImg = new PopupWithImage({
  popupSelector: popupPhotoItemSelector,
});

const popupDeleteCard = new PopupWithСonfirmation({
  popupSelector: popupDeleteItemSelector,
  handleFormSubmit: () => {
    popupDeleteCard.setLoadnigIsBtn(true);

    api
      .deleteCard(popupDeleteCard.card.id)
      .then(() => {
        popupDeleteCard.card.deleteCard();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupDeleteCard.setLoadnigIsBtn(false);
        popupDeleteCard.close();
      });
  },
});

const popupFormProfile = new PopupWithForm({
  popupSelector: popupEditProfileSelector,
  handleFormSubmit: (inputsValue) => {
    formValidators["profile-form"].resetValidation();
    popupFormProfile.setLoadnigIsBtn(true);

    api
      .pathUserInfo({
        name: inputsValue["user-name"],
        about: inputsValue["user-about"],
      })
      .then((data) => {
        userInfo.setUserInfo(data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupFormProfile.setLoadnigIsBtn(false);
        popupFormProfile.close();
      });
  },
});

const popupFormAvatar = new PopupWithForm({
  popupSelector: popupEditAvatarSelector,
  handleFormSubmit: (inputsValue) => {
    popupFormAvatar.setLoadnigIsBtn(true);
    api
      .patchAvatar({
        avatar: inputsValue["avatar-link"],
      })
      .then((data) => {
        userInfo.setUserInfo(data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupFormAvatar.setLoadnigIsBtn(false);
        popupFormAvatar.close();
      });
  },
});

const popupFormPhoto = new PopupWithForm({
  popupSelector: popupAddPhotoSelector,
  handleFormSubmit: (inputsValue) => {
    popupFormPhoto.setLoadnigIsBtn(true);

    api
      .postCard({
        name: inputsValue["photo-name"],
        link: inputsValue["photo-link"],
      })
      .then((data) => {
        renderGalleryItem(data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupFormPhoto.setLoadnigIsBtn(false);
        popupFormPhoto.close();
      });
  },
});

popupFullScreenImg.setEventListeners();
popupFormProfile.setEventListeners();
popupFormAvatar.setEventListeners();
popupFormPhoto.setEventListeners();
popupDeleteCard.setEventListeners();

function createCard(item) {
  const card = new Card({
    data: item,
    templateSelector: "#gallery-item-template",
    userId: userId,
    handleDeleteBtnClick: () => {
      popupDeleteCard.open(card);
    },
    handleLikeBtnClick: () => {
      if (card._isUserLiked()) {
        api
          .deleteCardLike(card.id)
          .then((data) => {
            card._likes = data.likes;
            card._renderLikeContainer();
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        api
          .putCardLike(card.id)
          .then((data) => {
            card._likes = data.likes;
            card._renderLikeContainer();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
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

const getInitialData = async () => {
  await api
    .getInitialUserInfo()
    .then((result) => {
      userId = result._id;
      userInfo.setUserInfo(result);
    })
    .catch((err) => {
      console.log(err);
    });

  await api
    .getInitialCards()
    .then((cards) => {
      galleryCardList.renderItems(cards.reverse());
    })
    .catch((err) => {
      console.log(err);
    });
};
getInitialData();

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

profileEditAvatarBtn.addEventListener("click", () => {
  formValidators["avatar-form"].resetValidation();
  popupFormAvatar.open();
});
