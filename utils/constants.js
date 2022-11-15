export const popupEditProfileInfo = document.querySelector('#popup_profile');
export const popupAddGalleryItem = document.querySelector('#popup_gallery');
export const popupFullScreenGalleryItem = document.querySelector('#popup_gallery_item');

export const popupFullScreenGalleryItemPhoto = popupFullScreenGalleryItem.querySelector('.popup__photo');
export const popupFullScreenGalleryItemName = popupFullScreenGalleryItem.querySelector('.popup__photo-name');

export const formPopupProfile = popupEditProfileInfo.querySelector('.popup__form');
export const formPopupGallery = popupAddGalleryItem.querySelector('.popup__form');

export const nameInputProfile = formPopupProfile.querySelector('.popup__input_field_name');
export const descriptionInput = formPopupProfile.querySelector('.popup__input_field_description');

export const nameInputGallery = formPopupGallery.querySelector('.popup__input_field_name');
export const linkInputGallery = formPopupGallery.querySelector('.popup__input_field_link');

export const profile = document.querySelector('.profile');
export const profileEditInfoBtn = profile.querySelector('.profile__edit-btn');
export const profileAddGalleryItemBtn = profile.querySelector('.profile__add-btn');
export const nameUser = profile.querySelector('.profile__user-name');
export const descriptionUser = profile.querySelector('.profile__user-description');

export const galleryListSelector = '.gallery__list';

export const formValidators = {};

export const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-btn',
  inactiveButtonClass: 'popup__save-btn_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

export const initialGalleryItems = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
