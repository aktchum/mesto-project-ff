export const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    }
];

export function createCard(cardData, deleteCardCallback, likeCardCallback, imageClickCallback) {
  const userTemplate = document.querySelector('#card-template').content;
  const userElement = userTemplate.querySelector('.places__item.card').cloneNode(true);

  userElement.querySelector('.card__image').src = cardData.link;
  userElement.querySelector('.card__image').alt = cardData.name;
  userElement.querySelector('.card__title').textContent = cardData.name;

  // Добавление обработчика на кнопку удаления
  const deleteButton = userElement.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', function() {
    deleteCardCallback(userElement);
  });

  // добавление обработчика на кнопку like
  const likeButton = userElement.querySelector('.card__like-button')
  likeButton.addEventListener('click', function() {
    likeCardCallback(likeButton);
  });

  // добавление обработчика на изображение карточки
  const cardImage = userElement.querySelector('.card__image');
  const cardTitle = userElement.querySelector('.card__title').textContent;
  cardImage.addEventListener('click', function () {
    imageClickCallback(cardImage, cardTitle);
  });

  return userElement;
};

export function deleteCard(cardElement) {
  cardElement.remove();
};

export function toggleLikeButton(button) {
  button.classList.toggle('card__like-button_is-active');
};