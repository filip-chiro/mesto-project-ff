// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
const cardsList = document.querySelector('.places__list');
// @todo: DOM узлы
// @todo: Функция создания карточки
function addCard (cardName, cardLink, cardDeletion) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  cardElement.querySelector('.card__title').textContent = cardName;
  cardElement.querySelector('.card__image').src = cardLink;
  cardElement.querySelector('.card__image').alt = cardName;

  const deleteButton = cardElement.querySelector('.card__delete-button');

  deleteButton.addEventListener('click', () => {
    cardDeletion(cardElement);
  });

  return cardElement;
};
// @todo: Функция удаления карточки
function callDeletion (element) {
  element.remove();
};
// @todo: Вывести карточки на страницу
 initialCards.forEach(element => {
  const cardFinal = addCard(element.name, element.link, callDeletion);
  cardsList.append(cardFinal);
 });
