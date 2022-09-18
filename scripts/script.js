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
  let nameUserContent = nameUser.textContent;
  let descriptionUserContent = descriptionUser.textContent;
  nameInput.value = nameUserContent;
  descriptionInput.value = descriptionUserContent;
}

function closePopup () {
  popup.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
  evt.preventDefault();
  let nameInputContent = nameInput.value;
  let descriptionInputContent = descriptionInput.value;
  nameUser.textContent = nameInputContent;
  descriptionUser.textContent = descriptionInputContent;
  closePopup();
}

formPopup.addEventListener('submit', formSubmitHandler);
openPopupBtn.addEventListener('click', openPopup);
closePopupBtn.addEventListener('click', closePopup);
