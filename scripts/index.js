const popup = document.querySelector('.popup');
const formPopup = popup.querySelector('.popup__container');
const closePopupBtn = formPopup.querySelector('.popup__close-btn');
const nameInput = formPopup.querySelector('.popup__input_field_name');
const descriptionInput = formPopup.querySelector('.popup__input_field_description');
const profile = document.querySelector('.profile');
const openPopupBtn = profile.querySelector('.profile__edit-btn');
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

function openPopup () {
  popup.classList.add('popup_opened');
  nameInput.value = nameUser.textContent;
  descriptionInput.value = descriptionUser.textContent;
}

function closePopup () {
  popup.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
  evt.preventDefault();
  nameUser.textContent = nameInput.value;
  descriptionUser.textContent = descriptionInput.value;
  closePopup();
}

function renderGallery (containerItem) {
  const galleryItemTemplate = document.querySelector('#gallery-item-template').content;
  containerItem.forEach((item) => {
    const galleryItem = galleryItemTemplate.querySelector('.gallery__list-element').cloneNode(true);
    const nameItem = galleryItem.querySelector('.gallery__name');
    const linkItem = galleryItem.querySelector('.gallery__photo');
    nameItem.textContent = item.name;
    linkItem.src = item.link;
    gallery.append(galleryItem);
  });

}
renderGallery(initialGallery);
formPopup.addEventListener('submit', formSubmitHandler);
openPopupBtn.addEventListener('click', openPopup);
closePopupBtn.addEventListener('click', closePopup);
