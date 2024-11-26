function openModal (popup) {
  popup.classList.add('popup_is-opened');
  popup.addEventListener('mousedown', closeByOverlay);
  document.addEventListener('keydown', closeByEsc);
};

function closeModal (popup) {
  popup.classList.remove('popup_is-opened');
  popup.removeEventListener('mousedown', closeByOverlay);
  document.removeEventListener('keydown', closeByEsc);
};

function closeByOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    closeModal(evt.target);
  }
};

function closeByEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened')
    closeModal(openedPopup);
  };
};

export {openModal, closeModal};