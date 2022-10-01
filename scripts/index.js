const popupProfile = document.querySelector('#popup_profile');
const popupGallery = document.querySelector('#popup_gallery');
const popupGalleryItem = document.querySelector('#popup_gallery_item');

const formPopupProfile = popupProfile.querySelector('.popup__container');
const formPopupGallery = popupGallery.querySelector('.popup__container');

const nameInputProfile = formPopupProfile.querySelector('.popup__input_field_name');
const descriptionInput = formPopupProfile.querySelector('.popup__input_field_description');

const nameInputGallery = formPopupGallery.querySelector('.popup__input_field_name');
const linkInputGallery = formPopupGallery.querySelector('.popup__input_field_link');

const profile = document.querySelector('.profile');
const openPopupProfileBtn = profile.querySelector('.profile__edit-btn');
const openPopupGalleryBtn = profile.querySelector('.profile__add-btn');
const nameUser = profile.querySelector('.profile__user-name');
const descriptionUser = profile.querySelector('.profile__user-description');

const gallery = document.querySelector('.gallery__list');
const initialGallery = [
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

function openPopup (popup) {
  popup.classList.add('popup_opened');
  const closePopupBtn = popup.querySelector('.popup__close-btn');
  closePopupBtn.addEventListener('click', () => { closePopup(popup); });
}

function closePopup (popup) {
  popup.classList.remove('popup_opened');
}

function fillPopupProfile () {
  nameInputProfile.value = nameUser.textContent;
  descriptionInput.value = descriptionUser.textContent;
}

function fillPopupGalleryItem (popup, link, name) {
  popup.querySelector('.popup__photo').src = link;
  popup.querySelector('.popup__photo-name').textContent = name;
}

function formProfileSubmitHandler (evt) {
  evt.preventDefault();

  nameUser.textContent = nameInputProfile.value;
  descriptionUser.textContent = descriptionInput.value;

  closePopup(popupProfile);
}

function formGallerySubmitHandler (evt) {
  evt.preventDefault();

  renderGallery([{
    name: nameInputGallery.value,
    link: linkInputGallery.value
  }]);

  nameInputGallery.value = null;
  linkInputGallery.value = null;
  closePopup(popupGallery);
}

function renderGallery (containerItem) {
  const galleryItemTemplate = document.querySelector('#gallery-item-template').content;
  containerItem.forEach((item) => {
    const galleryItem = galleryItemTemplate.querySelector('.gallery__list-element').cloneNode(true);
    const nameItem = galleryItem.querySelector('.gallery__name');
    const photoItem = galleryItem.querySelector('.gallery__photo');
    const likeItem = galleryItem.querySelector('.gallery__like');
    const trashItem = galleryItem.querySelector('.gallery__trash');
    likeItem.addEventListener('click', () => { activeLike(likeItem); });
    trashItem.addEventListener('click', () => { deleteGalleryItem(galleryItem); });
    photoItem.addEventListener('click', () => { openPopup(popupGalleryItem); fillPopupGalleryItem(popupGalleryItem, item.link, item.name); });
    nameItem.textContent = item.name;
    photoItem.src = item.link;
    gallery.prepend(galleryItem);
  });
}

function activeLike (item) {
  item.classList.toggle("gallery__like_active");
}

function deleteGalleryItem (item) {
  item.remove();
}

renderGallery(initialGallery);

formPopupProfile.addEventListener('submit', formProfileSubmitHandler);
formPopupGallery.addEventListener('submit', formGallerySubmitHandler);
openPopupProfileBtn.addEventListener('click', () => { openPopup(popupProfile); fillPopupProfile(); });
openPopupGalleryBtn.addEventListener('click', () => { openPopup(popupGallery); });
