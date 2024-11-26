const cardTemplate = document.querySelector('#card-template').content;

function addCard (cardName, cardLink, callDeletion, openPopup, likeCard) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  cardElement.querySelector('.card__title').textContent = cardName;
  const cardImage = cardElement.querySelector('.card__image');
  cardImage.src = cardLink;
  cardImage.alt = cardName;

  const deleteCardButton = cardElement.querySelector('.card__delete-button');

  const likeCardButton = cardElement.querySelector('.card__like-button');

  deleteCardButton.addEventListener('click', () => {
    callDeletion(cardElement);
  });

  cardImage.addEventListener('click', () => {
    openPopup(cardLink, cardName);
  });

  likeCardButton.addEventListener('click', likeCard);

  return cardElement;
};

function deleteCard (element) {
  element.remove();
};

function likeCard(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
};

export { addCard, deleteCard, likeCard };