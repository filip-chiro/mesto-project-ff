import '../styles/index.css';
import { initialCards } from './cards';
import { addCard, deleteCard, likeCard } from './card';
import { openModal, closeModal } from './modal';

const cardsList = document.querySelector('.places__list');

const popups = document.querySelectorAll('.popup');

const profileEditButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');

const editProfilePopup = document.querySelector(".popup_type_edit");
const newCardPopup = document.querySelector('.popup_type_new-card');

const imagePopup = document.querySelector('.popup_type_image');
const cardImagePopup = imagePopup.querySelector('.popup__image');
const cardCaption = imagePopup.querySelector('.popup__caption');

const popupCloseButtons = document.querySelectorAll('.popup__close');

const nameCurrent = document.querySelector('.profile__title');
const jobCurrent = document.querySelector('.profile__description');
const profileForm = document.forms['edit-profile'];
const nameInput = profileForm.elements.name;
const jobInput = profileForm.elements.description;

const cardForm = document.forms['new-place'];
const cardNameInput = cardForm.elements['place-name'];
const cardLinkInput = cardForm.elements['link'];

initialCards.forEach(element => {
  const cardFinal = addCard(element.name, element.link, deleteCard, openImagePopup, likeCard);
  cardsList.append(cardFinal);
 });

popups.forEach(popup => {
  popup.classList.add('popup_is-animated');
});

profileEditButton.addEventListener('click', () => {
  nameInput.value = nameCurrent.textContent;
  jobInput.value = jobCurrent.textContent;
  openModal(editProfilePopup);
});

addCardButton.addEventListener('click', () => {
  openModal(newCardPopup);
});

popupCloseButtons.forEach(button => {
  button.addEventListener('click', (evt) => {
    const popup = evt.target.closest('.popup');
    closeModal(popup);
  });
});

function openImagePopup(link, name) {
  cardImagePopup.src = link;
  cardImagePopup.alt = name;
  cardCaption.textContent = name;
  openModal(imagePopup);
};

function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    nameCurrent.textContent = nameInput.value;
    jobCurrent.textContent = jobInput.value;
    closeModal(editProfilePopup);
}

profileForm.addEventListener('submit', handleProfileFormSubmit);

function handleAddCard(evt) {
  evt.preventDefault();
  const name = cardNameInput.value;
  const link = cardLinkInput.value;
  const newCard = addCard(name, link, deleteCard, openImagePopup, likeCard);
  cardsList.prepend(newCard);
  cardForm.reset();
  closeModal(newCardPopup);
}

cardForm.addEventListener('submit', handleAddCard);
