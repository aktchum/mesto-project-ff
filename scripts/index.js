// Получаем шаблон и контейнер для карточек
const userTemplate = document.querySelector('#card-template').content;
const usersOnline = document.querySelector('.places__list');

// Функция создания карточки
function createCard(cardData, deleteCardCallback) {
  const userElement = userTemplate.querySelector('.places__item.card').cloneNode(true);

  userElement.querySelector('.card__image').src = cardData.link;
  userElement.querySelector('.card__image').alt = cardData.name;
  userElement.querySelector('.card__title').textContent = cardData.name;

  // Устанавливаем функцию удаления карточки
  const deleteButton = userElement.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', function() {
    deleteCardCallback(userElement);
  });

  return userElement;
}

// Функция-колбэк для удаления карточки
function deleteCard(cardElement) {
  cardElement.remove();
}

// Перебираем массив карточек и добавляем их на страницу
initialCards.forEach(function (card) {
  const cardElement = createCard(card, deleteCard);
  usersOnline.append(cardElement);
});






