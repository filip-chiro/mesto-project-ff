// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: Функция создания карточки
export function addCard (cardName, cardLink, callDeletion) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  cardElement.querySelector('.card__title').textContent = cardName;
  cardElement.querySelector('.card__image').src = cardLink;
  cardElement.querySelector('.card__image').alt = cardName;

  const deleteButton = cardElement.querySelector('.card__delete-button');

  deleteButton.addEventListener('click', () => {
    callDeletion(cardElement);
  });

  return cardElement;
};
// @todo: Функция удаления карточки
export function cardDeletion (element) {
  element.remove();
};
