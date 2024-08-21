import { likeCard, dislikeCard } from './api.js';

const userTemplate = document.querySelector('#card-template').content;

export function createCard({ cardData, deleteCardCallback, imageClickCallback, userId }) {
  const userElement = userTemplate.querySelector('.places__item.card').cloneNode(true);
  const cardImage = userElement.querySelector('.card__image');
  const cardTitle = userElement.querySelector('.card__title');

  const likeButton = userElement.querySelector('.card__like-button');
  const likeButtonCounter = userElement.querySelector('.card__like-counter');
  const deleteButton = userElement.querySelector('.card__delete-button');

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;
  likeButtonCounter.textContent = cardData.likes.length;

  // Проверка на возможность удаления карточки
  if (cardData.owner._id === userId) {
    deleteButton.addEventListener('click', () => {
      deleteCardCallback(userElement, cardData._id);
    });
  } else {
    // deleteButton.classList.add('card__delete-button-inactive');
    deleteButton.remove();
  }

  // Проверка на активность кнопки лайка. 
  //  Если идентификатор пользователя userId присутствует 
  //  в массиве лайков cardData.likes карточки, добавляется классы
  if (cardData.likes.some((el) => el._id === userId)) {
    likeButton.classList.add('card__like-button_is-active');
  }

  // Обработка лайков
  likeButton.addEventListener('click', () => {
    if (likeButton.classList.contains('card__like-button_is-active')) {
      dislikeCard(cardData._id)
        .then(updatedCard => {
          likeButton.classList.remove('card__like-button_is-active');
          likeButtonCounter.textContent = updatedCard.likes.length;
        })
        .catch(err => console.log(`Ошибка при снятии лайка: ${err}`));
    } else {
      likeCard(cardData._id)
        .then(updatedCard => {
          likeButton.classList.add('card__like-button_is-active');
          likeButtonCounter.textContent = updatedCard.likes.length;
        })
        .catch(err => console.log(`Ошибка при постановке лайка: ${err}`));
    }
  });

  // добавление обработчика на изображение карточки
  cardImage.addEventListener('click', () => {
    imageClickCallback(cardImage, cardTitle);
  });

  return userElement;
}

export function toggleLikeButton(button) {
  button.classList.toggle('card__like-button_is-active');
};