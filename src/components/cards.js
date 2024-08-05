const userTemplate = document.querySelector('#card-template').content;

export function createCard({ cardData, deleteCardCallback, likeCardCallback, imageClickCallback }) {
  const userElement = userTemplate.querySelector('.places__item.card').cloneNode(true);
  const cardImage = userElement.querySelector('.card__image');
  const cardTitle = userElement.querySelector('.card__title');

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

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