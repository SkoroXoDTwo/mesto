export const popupPhotoItemSelector = '#popup_gallery_item';
export const popupDeleteItemSelector = '#popup_delete_item';
export const popupEditProfileSelector = '#popup_profile';
export const popupEditAvatarSelector = '#popup_avatar';
export const popupAddPhotoSelector = '#popup_gallery';

export const profile = document.querySelector('.profile');
export const profileEditInfoBtn = profile.querySelector('.profile__edit-btn');
export const profileEditAvatarBtn = profile.querySelector('.profile__picture-btn');
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
