const apiConfig = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-27',
  headers: {
    authorization: '827e739b-7a95-4d53-8e87-089082202686',
    'Content-Type': 'application/json'
  }
};

const getServerResponse = res => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

const getUserInfo = () => {
  return fetch(`${apiConfig.baseUrl}/users/me`, {
    method: 'GET',
    headers: apiConfig.headers
  })
    .then(getServerResponse)
};

const editProfile = (name, about) => {
  return fetch(`${apiConfig.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: apiConfig.headers,
    body: JSON.stringify({
      name: name,
      about: about
    })
  })
    .then(getServerResponse)
};

const getCards = () => {
   return fetch(`${apiConfig.baseUrl}/cards`, {
    method: 'GET',
    headers: apiConfig.headers
   })
     .then(getServerResponse)
 };

 const addNewCard = (name, link) => {
  return fetch(`${apiConfig.baseUrl}/cards`, {
    method: 'POST',
    headers: apiConfig.headers,
    body: JSON.stringify({
      name: name,
      link: link
    })
  })
    .then(getServerResponse)
};

const deleteCardApi = (id) => {
  return fetch(`${apiConfig.baseUrl}/cards/${id}`, {
    method: 'DELETE',
    headers: apiConfig.headers,
  })
    .then(getServerResponse)
};

const likeCardApi = (id, isLiked) => {
  return fetch(`${apiConfig.baseUrl}//cards/likes/${id}`, {
    method: isLiked? 'DELETE': 'PUT',
    headers: apiConfig.headers,
  })
    .then(getServerResponse)
};

export { getUserInfo, getCards, editProfile, addNewCard, deleteCardApi, likeCardApi};