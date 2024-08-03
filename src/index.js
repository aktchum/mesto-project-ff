import './index.css';
import { initialCards } from './components/cards.js';
import { createCard, deleteCard, toggleLikeButton } from './components/cards.js';
import { openModal, closeModal } from './components/modal.js';

// шаблон и контейнер для карточек
const usersOnline = document.querySelector('.places__list');

// получение попапов
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const popupTypeImage = document.querySelector('.popup_type_image');

const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const allCloseButtons = document.querySelectorAll('.popup__close');
const allPopups = document.querySelectorAll('.popup');

// получение форм
const formElement = document.querySelector('.popup__form');
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_description');

const newPlaceForm = document.forms['new-place'];
const newPlaceInputName = newPlaceForm.elements['place-name'];
const newPlaceInputLink = newPlaceForm.elements.link;

// получение значений полей ввода формы
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

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
});
profileAddButton.addEventListener('click', function () {
  openModal(popupTypeNewCard);
});

// закрытие попапов на крестик
allCloseButtons.forEach(function(closeButton) {
  closeButton.addEventListener('click', function(evt) {
    const parentPopup = evt.target.closest('.popup');
    closeModal(parentPopup);
    formElement.reset();
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

// редактирование информации через попап редактирования
function handleFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(popupTypeEdit);
}
formElement.addEventListener('submit', handleFormSubmit); 

// добавление новой карточки в массив и в DOM через попап
function handlePlaceSubmit(evt) {
  evt.preventDefault();

  const newCard = {
    name: newPlaceInputName.value,
    link: newPlaceInputLink.value,
  };
  initialCards.unshift(newCard);

  const createNewCard = createCard(newCard, deleteCard, toggleLikeButton, handleImageClick);
  usersOnline.prepend(createNewCard);
  
  closeModal(popupTypeNewCard);
  newPlaceForm.reset();
};
newPlaceForm.addEventListener('submit', handlePlaceSubmit); 

// Перебираем массив карточек и добавляем их в DOM
initialCards.forEach(function (card) {
  const cardElement = createCard(card, deleteCard, toggleLikeButton, handleImageClick);
  usersOnline.append(cardElement);
});

// Функция обработки клика по изображению
function handleImageClick(cardImage, cardTitle) {
  const popupImage = popupTypeImage.querySelector('.popup__image');
  popupImage.src = cardImage.src;
  popupImage.alt = cardImage.alt;

  const cardCaption = popupTypeImage.querySelector('.popup__caption');
  cardCaption.textContent = cardTitle;

  openModal(popupTypeImage);
};