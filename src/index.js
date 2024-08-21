import './index.css';
// import { initialCards } from './components/initialCards.js';
import { createCard, toggleLikeButton, deleteCard } from './components/cards.js';
import { openModal, closeModal } from './components/modal.js';

import { enableValidation, clearValidation } from './components/validation.js';
import { 
  getUserInfo, 
  getInitialCards,
  updateUserInfo,
  addNewCard,
  updateAvatar,
 } from './components/api.js';

// контейнер для карточек
const placesList = document.querySelector('.places__list');

// получение попапов
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const popupTypeImage = document.querySelector('.popup_type_image');
const popupTypeAvatarEdit = document.querySelector('.popup_type_avatar-edit');
const popupImage = popupTypeImage.querySelector('.popup__image');
const cardCaption = popupTypeImage.querySelector('.popup__caption');
const profileEditButton = document.querySelector('.profile__edit-button');
const avatarEditButton = document.querySelector('.profile__image'); // Кнопка для редактирования аватара
const profileAddButton = document.querySelector('.profile__add-button');
const allCloseButtons = document.querySelectorAll('.popup__close');
const allPopups = document.querySelectorAll('.popup');

// получение форм
const profileForm = document.forms['edit-profile'];
const nameInput = profileForm.querySelector('.popup__input_type_name');
const jobInput = profileForm.querySelector('.popup__input_type_description');
const profileSubmitButton = profileForm.querySelector('.popup__button');

const newPlaceForm = document.forms['new-place'];
const newPlaceInputName = newPlaceForm.elements['place-name'];
const newPlaceInputLink = newPlaceForm.elements.link;
const newPlaceSubmitButton = newPlaceForm.querySelector('.popup__button');

const avatarEditForm = document.forms['avatar-edit']; // Форма для редактирования аватара
const avatarUrlInput = avatarEditForm.elements['avatar-link']; // Поле ввода URL аватара
const avatarSubmitButton = avatarEditForm.querySelector('.popup__button');

// получение значений полей ввода формы
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const avatarImage = document.querySelector('.profile__image');

const buttonText = {
  saving: 'Сохранение...',
  save: 'Сохранить',
};

//Валидация форм
const objValidation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

enableValidation(objValidation);

// Загрузка данных пользователя и карточек с сервера
let userInfoGlobal;
Promise.all([getUserInfo(), getInitialCards()])
  .then(([userInfo, initialCards]) => {
    // Обновляем информацию о пользователе на странице
    userInfoGlobal = userInfo;
    profileTitle.textContent = userInfo.name;
    profileDescription.textContent = userInfo.about;
    avatarImage.style.backgroundImage = `url(${userInfo.avatar})`;

    // Отображаем карточки на странице
    initialCards.forEach((cardData) => {
      renderCard(cardData, userInfo._id, "append");
    });
  })
  .catch(err => {
    console.log(`Ошибка загрузки данных: ${err}`);
  });

// Функция для добавления карточек в список карточек на странице
function renderCard(cardData, userId, method = "prepend") {
  const cardElement = createCard({
    cardData: cardData,
    deleteCardCallback: deleteCard,
    likeCardCallback: toggleLikeButton,
    imageClickCallback: handleImageClick,
    userId: userId
  });
  placesList[method](cardElement);
}


// добавление анимации попапам
document.addEventListener('DOMContentLoaded', function() {
  allPopups.forEach(function(popup) {
    popup.classList.add('popup_is-animated');
  });
});

// добавление обработчиков на кнопки попапов
profileEditButton.addEventListener('click', function () {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(popupTypeEdit);
  //очистка сообщения валидации
  clearValidation(popupTypeEdit, objValidation);
});
profileAddButton.addEventListener('click', function () {
  openModal(popupTypeNewCard);
  //очистка сообщения валидации
  clearValidation(popupTypeNewCard, objValidation);
});

// закрытие попапов на крестик
allCloseButtons.forEach(function(closeButton) {
  closeButton.addEventListener('click', function(evt) {
    const parentPopup = evt.target.closest('.popup');
    closeModal(parentPopup);
  });
});

// закрытие попапов на overlay
allPopups.forEach(function(popup) {
  popup.addEventListener('click', function(evt) {
    if (evt.target === popup) {
      closeModal(popup);
    }
  });
});

// функция изменения текста кнопки
function setSubmitButtonText(button, text) {
  button.textContent = text;
}

// редактирование информации через попап редактирования
function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  const name = nameInput.value;
  const about = jobInput.value;

  setSubmitButtonText(profileSubmitButton, buttonText.saving); // Изменяем текст кнопки

  // Отправляем обновленные данные на сервер
  updateUserInfo(name, about)
    .then((updatedUserInfo) => {
      // Если обновление прошло успешно, обновляем данные на странице
      profileTitle.textContent = updatedUserInfo.name;
      profileDescription.textContent = updatedUserInfo.about;
      closeModal(popupTypeEdit);
    })
    .catch((err) => {
      console.log(`Ошибка при обновлении профиля: ${err}`);
    })
    .finally(() => {
      setSubmitButtonText(profileSubmitButton, buttonText.save);
    });
}
profileForm.addEventListener('submit', handleProfileFormSubmit); 

// добавление новой карточки в массив и в DOM через попап
function handlePlaceSubmit(evt) {
  evt.preventDefault();

  const newCard = {
    name: newPlaceInputName.value,
    link: newPlaceInputLink.value,
  };

  setSubmitButtonText(newPlaceSubmitButton, buttonText.saving); // Изменяем текст кнопки

  // Отправляем новую карточку на сервер
  addNewCard(newCard.name, newCard.link)
    .then((cardData) => {
      // Добавляем карточку на страницу
      renderCard(cardData, userInfoGlobal._id, "prepend");
      closeModal(popupTypeNewCard);
      newPlaceForm.reset();
    })
    .catch(err => {
      console.log(`Ошибка добавления новой карточки: ${err}`);
    })
    .finally(() => {
      setSubmitButtonText(newPlaceSubmitButton, buttonText.save); // Возвращаем исходный текст кнопки
    });
}
newPlaceForm.addEventListener('submit', handlePlaceSubmit); 

// Функция обработки клика по изображению
function handleImageClick(cardImage, cardTitle) {
  popupImage.src = cardImage.src;
  popupImage.alt = cardImage.alt;
  cardCaption.textContent = cardTitle.textContent;

  openModal(popupTypeImage);
};

// Обработчики на форму редактирования аватара и её открытие
avatarEditButton.addEventListener('click', function () {
  openModal(popupTypeAvatarEdit);
  clearValidation(popupTypeAvatarEdit, objValidation);
});

avatarEditForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  
  const avatarUrl = avatarUrlInput.value;
  setSubmitButtonText(avatarSubmitButton, buttonText.saving);

  updateAvatar(avatarUrl)
    .then((updatedUserInfo) => {
      avatarImage.style.backgroundImage = `url(${updatedUserInfo.avatar})`;
      closeModal(popupTypeAvatarEdit);
      avatarEditForm.reset();
    })
    .catch((err) => {
      console.log(`Ошибка при обновлении аватара: ${err}`);
    })
    .finally(() => {
      setSubmitButtonText(avatarSubmitButton, buttonText.save);
    });
});