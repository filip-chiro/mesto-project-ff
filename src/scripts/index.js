import '../styles/index.css';
import { addCard, deleteCard, likeCard } from './card';
import { openModal, closeModal } from './modal';
import { enableValidation, clearValidation } from './validation';
import { addNewCard, editAvatarApi, editProfile, getCards, getUserInfo } from './api';

const cardsList = document.querySelector('.places__list');

const popups = document.querySelectorAll('.popup');

const profileEditButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');
const avatarEditButton = document.querySelector('.profile__image_edit-button');

const newCardPopup = document.querySelector('.popup_type_new-card');
const cardForm = document.forms['new-place'];
const cardNameInput = cardForm.elements['place-name'];
const cardLinkInput = cardForm.elements.link;

const popupCloseButtons = document.querySelectorAll('.popup__close');

const nameCurrent = document.querySelector('.profile__title');
const jobCurrent = document.querySelector('.profile__description');
const avatarCurrent = document.querySelector('.profile__image');

const editProfilePopup = document.querySelector(".popup_type_edit");
const editProfileForm = document.forms['edit-profile'];
const nameInput = editProfileForm.elements.name;
const jobInput = editProfileForm.elements.description;

const imagePopup = document.querySelector('.popup_type_image');
const cardImagePopup = imagePopup.querySelector('.popup__image');
const cardCaption = imagePopup.querySelector('.popup__caption');

const avatarPopup = document.querySelector('.popup_type_avatar');
const avatarForm = document.forms['edit-avatar'];
const avatarInput = avatarForm.elements.avatar;

const promises = [getUserInfo(), getCards()];

let myId = '';

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

avatarEditButton.addEventListener('click', () => {
  clearValidation(avatarForm, validationConfig);
  openModal(avatarPopup);
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
    const form = evt.currentTarget;
    const button = form.querySelector('.popup__button');
    button.textContent = 'Сохранение...';
    editProfile(nameInput.value, jobInput.value)
      .then(() => {
        nameCurrent.textContent = nameInput.value;
        jobCurrent.textContent = jobInput.value;
        closeModal(editProfilePopup);
      })
      .catch(err => console.log(err))
      .finally(() => {
        button.textContent = 'Сохранить'
      })
};

function handleAddCard(evt) {
  evt.preventDefault();
  const form = evt.currentTarget;
  const button = form.querySelector('.popup__button');
  button.textContent = 'Сохранение...';
  addNewCard(cardNameInput.value, cardLinkInput.value)
    .then((card) => {
      const name = cardNameInput.value;
      const link = cardLinkInput.value;
      const newCard = addCard(card._id, name, link, deleteCard, card.likes, openImagePopup, likeCard, card.owner._id, myId);
      cardsList.prepend(newCard);
      cardForm.reset();
      closeModal(newCardPopup);
    })
    .catch(err => console.log(err))
    .finally(() => {
      button.textContent = 'Сохранить'
    })
};

function handleAvatarSubmit(evt) {
  evt.preventDefault();
  const form = evt.currentTarget;
  const button = form.querySelector('.popup__button');
  button.textContent = 'Сохранение...';
  editAvatarApi(avatarInput.value)
    .then(data => {
      avatarCurrent.style.backgroundImage = `url(${data.avatar})`;
      closeModal(avatarPopup);
      avatarForm.reset();
    })
    .catch(err => console.log(err))
    .finally(() => {
      button.textContent = 'Сохранить'
    })
};

editProfileForm.addEventListener('submit', handleProfileFormSubmit);
cardForm.addEventListener('submit', handleAddCard);
avatarForm.addEventListener('submit', handleAvatarSubmit);

enableValidation(validationConfig);