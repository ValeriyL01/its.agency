import createElement from './createElement.js';
import { store } from '../js/store.js';

export const renderQuantityProduct = () => {
  const quantityElement = document.querySelector('.header__icon-basket');
  const quantityPopup = document.querySelector('.cart-popup__quantity');

  quantityElement.innerHTML = `${store.cart.length}`;
  quantityPopup.innerHTML = `${store.cart.length} товара`;
};
const calculateTotal = () => store.cart.reduce((sum, product) => sum + product.price * product.quantity, 0);
const renderTotal = () => {
  const total = document.querySelector('.cart-popup__total');
  const totalPrice = calculateTotal();
  total.textContent = `Total: ${totalPrice}₽`;
};

export const renderCart = () => {
  const cartContainer = document.querySelector('.cart-container');
  cartContainer.innerHTML = '';

  store.cart.forEach((product) => {
    const cartItemComponent = createCartItemComponent(product, false);
    const rectangle = createElement('div', 'cart-container__rectangle');
    cartContainer.append(rectangle, cartItemComponent);
  });
  if (store.removedProducts.length > 0) {
    store.removedProducts.forEach((product) => {
      const cartItemComponent = createCartItemComponent(product, true);
      const rectangle = createElement('div', 'cart-container__rectangle');
      cartContainer.append(rectangle, cartItemComponent);
    });
  }
  renderTotal();
};
const removeFromCart = (product) => {
  store.cart = store.cart.filter((item) => item.id !== product.id);
  store.removedProducts.push(product);
  renderCart();
  renderQuantityProduct();
};
const updateQuantityProduct = (product, change) => {
  const cartProduct = store.cart.find((item) => item.id === product.id);

  if (cartProduct) {
    cartProduct.quantity += change;
    if (cartProduct.quantity <= 0) {
      removeFromCart(product);
    } else {
      renderCart();
    }
  }
};
const clearCartButton = document.querySelector('.cart-popup__clear');

clearCartButton.addEventListener('click', () => {
  store.cart = [];
  store.removedProducts = [];

  renderCart();
  renderQuantityProduct();
});
export const createCartItemComponent = (product, isRemoved = false) => {
  const cartItemWrapper = createElement('div', 'cart-item');

  const img = createElement('img', 'cart-item__image', null, { src: product.avatar, alt: product.name });
  const namePriceContainer = createElement('div', 'cart-item__name-price');
  const name = createElement('h3', 'cart-item__name', product.name);
  const price = createElement('p', 'cart-item__price', `${product.price * product.quantity}₽`);

  const quantityContainer = createElement('div', 'cart-item__quantity-container');
  const decreaseButton = createElement('button', 'cart-item__decrease-button', '-');
  const quantityCounter = createElement('span', 'cart-item__quantity-counter', product.quantity);
  const increaseButton = createElement('button', 'cart-item__increase-button', '+');

  const removeButton = createElement('button', 'cart-item__remove-button');
  if (isRemoved) {
    removeButton.classList.add('cart-item__remove-button--restore');
    img.style.opacity = '0.5';
    namePriceContainer.style.opacity = '0.5';
    quantityContainer.style.opacity = '0.5';
  }

  quantityContainer.append(decreaseButton, quantityCounter, increaseButton);
  cartItemWrapper.append(img, namePriceContainer, quantityContainer, removeButton);
  namePriceContainer.append(name, price);
  decreaseButton.addEventListener('click', () => {
    updateQuantityProduct(product, -1);
    price.textContent = `${product.price * product.quantity}₽`;
    quantityCounter.textContent = product.quantity;
  });

  increaseButton.addEventListener('click', () => {
    updateQuantityProduct(product, 1);
    price.textContent = `${product.price * product.quantity}₽`;
    quantityCounter.textContent = product.quantity;
  });

  removeButton.addEventListener('click', () => {
    if (isRemoved) {
      store.cart.push(product);
      store.removedProducts = store.removedProducts.filter((item) => item.id !== product.id);
      renderCart();
    } else {
      store.cart = store.cart.filter((item) => item.id !== product.id);
      store.removedProducts.push(product);
      renderCart();
    }
  });

  return cartItemWrapper;
};

export const addToCart = (product) => {
  const existingProduct = store.cart.find((item) => item.id === product.id);
  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    store.cart.push({ ...product, quantity: 1 });
  }

  renderQuantityProduct();
  renderCart();
};
export const initializeCart = () => {
  renderCart();
};
