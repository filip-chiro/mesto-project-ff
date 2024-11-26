import '../styles/index.css';
import { initialCards } from './cards';
import { addCard, cardDeletion } from './card';
import { openModal, closeModal } from './modal';

const cardsList = document.querySelector('.places__list');

const popups = document.querySelectorAll('.popup');

const profileEditButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');

const editProfilePopup = document.querySelector(".popup_type_edit");
const newCardPopup = document.querySelector('.popup_type_new-card');

const popupCloseButtons = document.querySelectorAll('.popup__close');

// @todo: Вывести карточки на страницу
initialCards.forEach(element => {
  const cardFinal = addCard(element.name, element.link, cardDeletion);
  cardsList.append(cardFinal);
 });

popups.forEach(popup => {
  popup.classList.add('popup_is-animated');
})

profileEditButton.addEventListener('click', () => {
  openModal(editProfilePopup);
});

addCardButton.addEventListener('click', () => {
  openModal(newCardPopup);
})

popupCloseButtons.forEach(button => {
  button.addEventListener('click', (evt) => {
    const popup = evt.target.closest('.popup');
    closeModal(popup);
  });
});

