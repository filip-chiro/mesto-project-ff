import { deleteCardApi, likeCardApi } from "./api";

const cardTemplate = document.querySelector('#card-template').content;

function addCard (cardId, cardName, cardLink, callDeletion, likes, openPopup, likeCard, ownerId, UserId) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  cardElement.querySelector('.card__title').textContent = cardName;
  const cardImage = cardElement.querySelector('.card__image');
  cardImage.src = cardLink;
  cardImage.alt = cardName;

  const likesCount = cardElement.querySelector('.card__like-count')
  const likeCardButton = cardElement.querySelector('.card__like-button');
  likesCount.textContent = likes.length;

  const deleteCardButton = cardElement.querySelector('.card__delete-button');

  if (ownerId !== UserId) { 
    deleteCardButton.remove();
  } else {
    deleteCardButton.addEventListener('click', () => {
      callDeletion(cardElement, cardId);
    });
  };

  const isCardLiked = likes.some(like => like._id === UserId);
  if (isCardLiked) {
     likeCardButton.classList.add('card__like-button_is-active');
    };

  cardImage.addEventListener('click', () => {
    openPopup(cardLink, cardName);
  });

  likeCardButton.addEventListener('click', () =>{
    likeCard(likeCardButton, cardId, likesCount);
  })

  return cardElement;
};

function deleteCard (element, cardId) {
  deleteCardApi(cardId)
    .then(() => {
      element.remove();
    })
    .catch(err => {
			console.log(`Ошибка при удалении карточки: ${err}`)
		})
};

function likeCard(button, cardId, likesCount) {
  const isLiked = button.classList.contains('card__like-button_is-active');
  likeCardApi(cardId, isLiked)
    .then(card => {
      button.classList.toggle('card__like-button_is-active');
      likesCount.textContent = card.likes.length;
    })
    .catch(err => {
			console.log(`Ошибка при лайке карточки: ${err}`)
		})
};

export { addCard, deleteCard, likeCard };