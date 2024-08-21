const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-20',
  headers: {
    authorization: '93b36b91-e849-4a26-8317-b182f235ff0c',
    'Content-Type': 'application/json'
  }
};

// Выносим проверку ответа от сервер в отдельную функцию
function getResponseData(res) {
  if (!res.ok) {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  return res.json();
}

// Функция для получения информации о пользователе
export const getUserInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
  .then(getResponseData);
};

// Функция для получения списка карточек
export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
  .then(getResponseData);
};

// Функция для обновления информации о пользователе
export const updateUserInfo = (name, about) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about
    })
  })
  .then(getResponseData);
};

// Функция для добавления новой карточки на сервер
export const addNewCard = (name, link) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link
    })
  })
  .then(getResponseData);
};

// Функция для постановки лайка (PUT-запрос)
export const likeCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers
  })
  .then(getResponseData);
};

// Функция для снятия лайка (DELETE-запрос)
export const dislikeCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(getResponseData);
};

// Удаление карточки
export const deleteCardFromServer = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(getResponseData);
};

// Функция обновления аватара
export const updateAvatar = (avatarUrl) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarUrl
    })
  })
  .then(getResponseData);
};