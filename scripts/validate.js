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
  const buttonElement = formElement.querySelector(settingList.submitButtonSelector);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, settingList);
      toggleButtonState(inputList, buttonElement, settingList);
    });
  });
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement, settingList) => {
  if(hasInvalidInput(inputList)) {
    buttonElement.classList.add(settingList.inactiveButtonClass);
    buttonElement.disabled = true;
  }
  else {
    buttonElement.classList.remove(settingList.inactiveButtonClass);
    buttonElement.disabled = false;
  }
};

const enableValidation = (settingList) => {
  const formList = Array.from(document.querySelectorAll(settingList.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, settingList);
  });
};

const clearValidationErrors = (popupElement, settingList) => {
  const formElement = popupElement.querySelector('.popup__form');
  const inputList =  Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector(settingList.submitButtonSelector);
  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, settingList);
    toggleButtonState(inputList, buttonElement, settingList);;
  });
};
