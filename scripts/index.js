// @todo: Темплейт карточки
// @todo: DOM узлы
const userTemplate = document.querySelector('#card-template').content;
const usersOnline = document.querySelector('.places__list');
// @todo: Функция создания карточки
initialCards.forEach(function (card) {
  const userElement = userTemplate.querySelector('.places__item.card').cloneNode(true);

  userElement.querySelector('.card__image').src = card.link;
  userElement.querySelector('.card__image').alt = card.name;
  userElement.querySelector('.card__title').textContent = card.name;
// @todo: Функция удаления карточки
  const deleteButton = userElement.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', function() {
    userElement.remove()
  });
// @todo: Вывести карточки на страницу
  usersOnline.append(userElement);
});