// Функция отображения сообщения об ошибке
function showInputError(formElement, inputElement, errorMessage, { inputErrorClass, errorClass }) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
}

// Функция скрытия сообщения об ошибке
function hideInputError(formElement, inputElement, { inputErrorClass, errorClass }) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';

  // Сброс пользовательского сообщения об ошибке
  inputElement.setCustomValidity("");
}

// Функция проверки валидности поля
function checkInputValidity(formElement, inputElement, config) {
  if (inputElement.validity.patternMismatch) {
      inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
      inputElement.setCustomValidity('');
  }

  if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage, config);
  } else {
      hideInputError(formElement, inputElement, config);
  }
}

// Функция отключения или включения кнопки submit
function toggleButtonState(inputList, buttonElement, { inactiveButtonClass }) {
  const hasInvalidInput = inputList.some((inputElement) => !inputElement.validity.valid);

  if (hasInvalidInput) {
      buttonElement.classList.add(inactiveButtonClass);
      buttonElement.disabled = true;
  } else {
      buttonElement.classList.remove(inactiveButtonClass);
      buttonElement.disabled = false;
  }
}

// Функция установки слушателей на форму
function setEventListeners(formElement, config) {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, config);

  inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
          checkInputValidity(formElement, inputElement, config);
          toggleButtonState(inputList, buttonElement, config);
      });
  });
}

// Функция очистки ошибок валидации и сброса кнопки
export function clearValidation(formElement, config) {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, config)
  });
  toggleButtonState(inputList, buttonElement, config);
};

// Функция включения валидации всех форм
export function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));

  formList.forEach((formElement) => {
      setEventListeners(formElement, config);
  });
};