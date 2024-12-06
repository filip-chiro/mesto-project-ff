import '../styles/index.css';
import { addCard, deleteCard, likeCard } from './card';
import { openModal, closeModal } from './modal';
import { enableValidation, clearValidation } from './validation';
import { addNewCard, editProfile, getCards, getUserInfo } from './api';

const cardsList = document.querySelector('.places__list');

const popups = document.querySelectorAll('.popup');

const profileEditButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');

const editProfilePopup = document.querySelector(".popup_type_edit");
const editProfileForm = document.querySelector('.popup__form[name="edit-profile"]');
const newCardPopup = document.querySelector('.popup_type_new-card');

const imagePopup = document.querySelector('.popup_type_image');
const cardImagePopup = imagePopup.querySelector('.popup__image');
const cardCaption = imagePopup.querySelector('.popup__caption');

const popupCloseButtons = document.querySelectorAll('.popup__close');

const nameCurrent = document.querySelector('.profile__title');
const jobCurrent = document.querySelector('.profile__description');
const avatarCurrent = document.querySelector('.profile__image');

const profileForm = document.forms['edit-profile'];
const nameInput = profileForm.elements.name;
const jobInput = profileForm.elements.description;

const cardForm = document.forms['new-place'];
const cardNameInput = cardForm.elements['place-name'];
const cardLinkInput = cardForm.elements['link'];

let myId = '';
const promises = [getUserInfo(), getCards()];

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

Promise.all(promises)
  .then(([data, cards]) => {
    nameCurrent.textContent = data.name;
    jobCurrent.textContent = data.about;
    avatarCurrent.style.backgroundImage = `url("${data.avatar}")`;
    myId = data['_id'];
    
    cards.forEach(card => {
      const cardFinal = addCard(card._id, card.name, card.link, deleteCard, card.likes, openImagePopup, likeCard, card.owner._id, myId);
      cardsList.append(cardFinal);
     });
  })
  .catch(err => {
    console.log(err);
  });

popups.forEach(popup => {
  popup.classList.add('popup_is-animated');
});

profileEditButton.addEventListener('click', () => {
  nameInput.value = nameCurrent.textContent;
  jobInput.value = jobCurrent.textContent;
  clearValidation(editProfileForm, validationConfig);
  openModal(editProfilePopup);
});

addCardButton.addEventListener('click', () => {
  clearValidation(cardForm, validationConfig);
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
    editProfile(nameInput.value, jobInput.value)
      .then(() => {
        nameCurrent.textContent = nameInput.value;
        jobCurrent.textContent = jobInput.value;
      });
    closeModal(editProfilePopup);
};

profileForm.addEventListener('submit', handleProfileFormSubmit);

function handleAddCard(evt) {
  evt.preventDefault();
  addNewCard(cardNameInput.value, cardLinkInput.value)
    .then((card) => {
      const name = cardNameInput.value;
      const link = cardLinkInput.value;
      const newCard = addCard(card._id, name, link, deleteCard, card.likes, openImagePopup, likeCard, card.owner._id, myId);
      cardsList.prepend(newCard);
      cardForm.reset();
      closeModal(newCardPopup);
    })
    .catch(err => console.log(err));
};

cardForm.addEventListener('submit', handleAddCard);

enableValidation(validationConfig);

