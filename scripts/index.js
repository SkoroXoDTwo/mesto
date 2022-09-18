const popup = document.querySelector('.popup');
const formPopup = popup.querySelector('.popup__container');
const closePopupBtn = formPopup.querySelector('.popup__close-btn');
const nameInput = formPopup.querySelector('.popup__input_field_name');
const descriptionInput = formPopup.querySelector('.popup__input_field_description');
const profile = document.querySelector('.profile');
const openPopupBtn = profile.querySelector('.profile__edit-btn');
const nameUser = profile.querySelector('.profile__user-name');
const descriptionUser = profile.querySelector('.profile__user-description');

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

formPopup.addEventListener('submit', formSubmitHandler);
openPopupBtn.addEventListener('click', openPopup);
closePopupBtn.addEventListener('click', closePopup);
