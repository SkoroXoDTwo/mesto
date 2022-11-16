export const popupPhotoItemSelector = '#popup_gallery_item';
export const popupEditProfileSelector = '#popup_profile';
export const popupAddPhotoSelector = '#popup_gallery';

export const profile = document.querySelector('.profile');
export const profileEditInfoBtn = profile.querySelector('.profile__edit-btn');
export const profileAddGalleryItemBtn = profile.querySelector('.profile__add-btn');

export const galleryListSelector = '.gallery__list';

export const formValidators = {};

export const configValidator = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-btn',
  inactiveButtonSelector: 'popup__save-btn_disabled',
  inputErrorSelector: 'popup__input_type_error',
  errorSelector: 'popup__input-error_active'
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
