const showInputError = (formElement, inputElement, errorMessage, settingList) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(settingList.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(settingList.errorClass);
};

const hideInputError = (formElement, inputElement, settingList) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(settingList.inputErrorClass);
  errorElement.classList.remove(settingList.errorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, settingList) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, settingList);
  } else {
    hideInputError(formElement, inputElement, settingList);
  }
};

const setEventListeners = (formElement, settingList) => {
  const inputList = Array.from(formElement.querySelectorAll(settingList.inputSelector));
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, settingList);
    });
  });
};

const enableValidation = (settingList) => {
  const formList = Array.from(document.querySelectorAll(settingList.formSelector));
  console.log('f')
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, settingList);
  });
};


