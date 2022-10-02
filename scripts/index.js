const popupEditProfileInfo = document.querySelector('#popup_profile');
const popupAddGalleryItem = document.querySelector('#popup_gallery');
const popupFullScreenGalleryItem = document.querySelector('#popup_gallery_item');

const closePopupEditProfileInfoBtn = popupEditProfileInfo.querySelector('.popup__close-btn');
const closePopupAddGalleryItemBtn = popupAddGalleryItem.querySelector('.popup__close-btn');
const closePopupFullScreenGalleryItemoBtn = popupFullScreenGalleryItem.querySelector('.popup__close-btn');

const popupFullScreenGalleryItemPhoto = popupFullScreenGalleryItem.querySelector('.popup__photo');
const popupFullScreenGalleryItemName = popupFullScreenGalleryItem.querySelector('.popup__photo-name');

const formPopupProfile = popupEditProfileInfo.querySelector('.popup__container');
const formPopupGallery = popupAddGalleryItem .querySelector('.popup__container');

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

function openPopup (popup) {
  popup.classList.add('popup_opened');
}

function closePopup (popup) {
  popup.classList.remove('popup_opened');
}

function fillPopupEditProfileInfo () {
  nameInputProfile.value = nameUser.textContent;
  descriptionInput.value = descriptionUser.textContent;
}

function fillPopupFullScreenGalleryItem (link, name) {
  popupFullScreenGalleryItemPhoto.src = link;
  popupFullScreenGalleryItemPhoto.alt = name;
  popupFullScreenGalleryItemName.textContent = name;
}

function formProfileSubmitHandler (evt) {
  evt.preventDefault();

  nameUser.textContent = nameInputProfile.value;
  descriptionUser.textContent = descriptionInput.value;

  closePopup(popupEditProfileInfo);
}

function formGallerySubmitHandler (evt) {
  evt.preventDefault();

  renderGalleryItem(nameInputGallery.value, linkInputGallery.value);

  nameInputGallery.value = '';
  linkInputGallery.value = '';
  closePopup(popupAddGalleryItem);
}

function createGalleryItem (name, link) {
  const galleryItem = galleryItemTemplate.querySelector('.gallery__list-element').cloneNode(true);
  const nameItem = galleryItem.querySelector('.gallery__name');
  const photoItem = galleryItem.querySelector('.gallery__photo');
  const likeItem = galleryItem.querySelector('.gallery__like');
  const trashItem = galleryItem.querySelector('.gallery__trash');

  likeItem.addEventListener('click', () => { activeLike(likeItem); });
  trashItem.addEventListener('click', () => { deleteGalleryItem(galleryItem); });
  photoItem.addEventListener('click', () => {
    openPopup(popupFullScreenGalleryItem);
    fillPopupFullScreenGalleryItem(link, name);
   });

  nameItem.textContent = name;
  photoItem.src = link;
  photoItem.alt = name;

  return galleryItem;
}

function renderGalleryItem (name, link) {
    const item = createGalleryItem(name, link);
    gallery.prepend(item);
}

function renderGallery (containerItem) {
  containerItem.forEach((item) => { renderGalleryItem(item.name, item.link) });
}

function activeLike (item) {
  item.classList.toggle('gallery__like_active');
}

function deleteGalleryItem (item) {
  item.remove();
}

renderGallery(initialGalleryItems);

profileEditInfoBtn.addEventListener('click', () => {
  openPopup(popupEditProfileInfo);
  fillPopupEditProfileInfo();
});

profileAddGalleryItemBtn.addEventListener('click', () => { openPopup(popupAddGalleryItem ); });

closePopupEditProfileInfoBtn.addEventListener('click', () => { closePopup(popupEditProfileInfo); });
closePopupAddGalleryItemBtn.addEventListener('click', () => { closePopup(popupAddGalleryItem); });
closePopupFullScreenGalleryItemoBtn.addEventListener('click', () => { closePopup(popupFullScreenGalleryItem); });

formPopupProfile.addEventListener('submit', formProfileSubmitHandler);
formPopupGallery.addEventListener('submit', formGallerySubmitHandler);
