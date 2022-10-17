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

const gallery = document.querySelector('.gallery__list');
const galleryItemTemplate = document.querySelector('#gallery-item-template').content;

const openedPopup = () => { return document.querySelector('.popup_opened') };

const settingList = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-btn',
  inactiveButtonClass: 'popup__save-btn_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

function openPopup (popup) {
  popup.classList.add('popup_opened');
  window.addEventListener('keydown', closePopupKeyEsc);
};

function closePopup (popup) {
  popup.classList.remove('popup_opened');
  window.removeEventListener('keydown', closePopupKeyEsc);
};

function closePopupKeyEsc (evt) {
  if(evt.key === 'Escape') {
    closePopup(openedPopup());
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

function fillPopupEditProfileInfo () {
  nameInputProfile.value = nameUser.textContent;
  descriptionInput.value = descriptionUser.textContent;
};

function fillPopupAddGalleryItem () {
  formPopupGallery.reset();
};

function fillProfileInfo () {
  nameUser.textContent = nameInputProfile.value;
  descriptionUser.textContent = descriptionInput.value;
};

function fillPopupFullScreenGalleryItem (link, name) {
  popupFullScreenGalleryItemPhoto.src = link;
  popupFullScreenGalleryItemPhoto.alt = name;
  popupFullScreenGalleryItemName.textContent = name;
};

function createGalleryItem (item) {
  const galleryItem = galleryItemTemplate.querySelector('.gallery__list-element').cloneNode(true);
  const nameItem = galleryItem.querySelector('.gallery__name');
  const photoItem = galleryItem.querySelector('.gallery__photo');
  const likeItem = galleryItem.querySelector('.gallery__like');
  const trashItem = galleryItem.querySelector('.gallery__trash');

  likeItem.addEventListener('click', () => { handleLikeClick(likeItem); });
  trashItem.addEventListener('click', () => { deleteGalleryItem(galleryItem); });
  photoItem.addEventListener('click', () => {
    openPopup(popupFullScreenGalleryItem);
    fillPopupFullScreenGalleryItem(item.link, item.name);
   });

  nameItem.textContent = item.name;
  photoItem.src = item.link;
  photoItem.alt = item.name;

  return galleryItem;
};

function renderGalleryItem (name, link) {
    const item = createGalleryItem( {name, link} );
    gallery.prepend(item);
};

function renderGallery (containerItem) {
  containerItem.forEach((item) => { renderGalleryItem(item.name, item.link) });
};

function handleLikeClick (item) {
  item.classList.toggle('gallery__like_active');
};

function deleteGalleryItem (item) {
  item.remove();
};

function formProfileSubmitHandler (evt) {
  evt.preventDefault();
  fillProfileInfo();
  closePopup(popupEditProfileInfo);
};

function formGallerySubmitHandler (evt) {
  evt.preventDefault();
  renderGalleryItem(nameInputGallery.value, linkInputGallery.value);
  fillPopupAddGalleryItem();
  clearValidationErrors(popupAddGalleryItem);
  closePopup(popupAddGalleryItem);
};

renderGallery(initialGalleryItems);
addListenerClosePopupBtns();

profileEditInfoBtn.addEventListener('click', () => {
  clearValidationErrors(popupEditProfileInfo);
  fillPopupEditProfileInfo();
  openPopup(popupEditProfileInfo);
});

profileAddGalleryItemBtn.addEventListener('click', () => {
  openPopup(popupAddGalleryItem);
});

formPopupProfile.addEventListener('submit', formProfileSubmitHandler);
formPopupGallery.addEventListener('submit', formGallerySubmitHandler);

enableValidation(settingList);
