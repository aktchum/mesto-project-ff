import './index.css';
import { initialCards } from './components/initialCards.js';
import { createCard, deleteCard, toggleLikeButton } from './components/cards.js';
import { openModal, closeModal } from './components/modal.js';

// контейнер для карточек
const placesList = document.querySelector('.places__list');

// получение попапов
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const popupTypeImage = document.querySelector('.popup_type_image');
const popupImage = popupTypeImage.querySelector('.popup__image');
const cardCaption = popupTypeImage.querySelector('.popup__caption');

const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const allCloseButtons = document.querySelectorAll('.popup__close');
const allPopups = document.querySelectorAll('.popup');

// получение форм
const profileForm = document.forms['edit-profile'];
const nameInput = profileForm.querySelector('.popup__input_type_name');
const jobInput = profileForm.querySelector('.popup__input_type_description');

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
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(popupTypeEdit);
}
profileForm.addEventListener('submit', handleProfileFormSubmit); 

// добавление новой карточки в массив и в DOM через попап
function handlePlaceSubmit(evt) {
  evt.preventDefault();

  const newCard = {
    name: newPlaceInputName.value,
    link: newPlaceInputLink.value,
  };

  renderCard(newCard, "prepend");
  
  closeModal(popupTypeNewCard);
  newPlaceForm.reset();
};
newPlaceForm.addEventListener('submit', handlePlaceSubmit); 

// Перебираем массив карточек и добавляем их в DOM
initialCards.forEach(function (card) {
  renderCard(card, "append");
});

//  Функция для добавления карточек в список карточек на странице
function renderCard(item, method = "prepend") {
  const cardElement = createCard({
    cardData: item,
    deleteCardCallback: deleteCard,
    likeCardCallback: toggleLikeButton,
    imageClickCallback: handleImageClick
  });
  placesList[method](cardElement);
};

// Функция обработки клика по изображению
function handleImageClick(cardImage, cardTitle) {
  popupImage.src = cardImage.src;
  popupImage.alt = cardImage.alt;
  cardCaption.textContent = cardTitle.textContent;

  openModal(popupTypeImage);
};