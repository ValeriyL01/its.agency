const iconBasketHeader = document.querySelector('.header__icon-basket ');
const closeButton = document.querySelector('.cart-popup__close-button ');

const cartPopup = document.querySelector('.cart-popup');
const overlay = document.getElementById('overlay');
export const showCartPopup = () => {
  cartPopup.classList.add('show');
  overlay.classList.add('show');
};

function hideCartPopup() {
  overlay.classList.remove('show');
  cartPopup.classList.remove('show');
}

export function initCartPopup() {
  iconBasketHeader.addEventListener('click', showCartPopup);

  closeButton.addEventListener('click', hideCartPopup);
}
