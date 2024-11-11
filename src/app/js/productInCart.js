import createElement from './createElement.js';
import { store } from './store.js';

export const renderQuantityProduct = () => {
  const quantityElement = document.querySelector('.header__icon-basket');
  const quantityPopup = document.querySelector('.cart-popup__quantity');

  const quantity = store.cart.length;
  quantityElement.innerHTML = `${quantity}`;
  quantityPopup.innerHTML = `${quantity} товара`;
};

const calculateTotal = () => store.cart.reduce((sum, product) => sum + product.price * product.quantity, 0);

const renderTotal = () => {
  const total = document.querySelector('.cart-popup__total');
  const totalPrice = calculateTotal();
  total.textContent = `Total: ${totalPrice}₽`;
};

const clearCart = () => {
  store.cart = [];
  store.removedProducts = [];
  renderCart();
  renderQuantityProduct();
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
clearCartButton.addEventListener('click', clearCart);

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

  return {
    cartItemWrapper,
    decreaseButton,
    increaseButton,
    removeButton,
    price,
    quantityCounter,
  };
};

const updateItemPriceAndQuantity = (product, priceElement, quantityElement) => {
  priceElement.textContent = `${product.price * product.quantity}₽`;
  quantityElement.textContent = product.quantity;
};

export const renderCart = () => {
  const cartContainer = document.querySelector('.cart-container');
  cartContainer.innerHTML = '';
  store.cart.forEach((product) => {
    const rectangle = createElement('div', 'rectangle');
    const { cartItemWrapper, decreaseButton, increaseButton, removeButton, price, quantityCounter } =
      createCartItemComponent(product);
    cartContainer.append(rectangle, cartItemWrapper);

    decreaseButton.addEventListener('click', () => {
      updateQuantityProduct(product, -1);
      updateItemPriceAndQuantity(product, price, quantityCounter);
    });

    increaseButton.addEventListener('click', () => {
      updateQuantityProduct(product, 1);
      updateItemPriceAndQuantity(product, price, quantityCounter);
    });

    removeButton.addEventListener('click', () => {
      if (removeButton.classList.contains('cart-item__remove-button--restore')) {
        store.cart.push(product);
        store.removedProducts = store.removedProducts.filter((item) => item.id !== product.id);
        renderCart();
      } else {
        store.cart = store.cart.filter((item) => item.id !== product.id);
        store.removedProducts.push(product);
        renderCart();
        renderQuantityProduct();
      }
    });
  });
  store.removedProducts.forEach((product) => {
    const rectangle = createElement('div', 'rectangle');
    const { cartItemWrapper, decreaseButton, increaseButton, removeButton, price, quantityCounter } =
      createCartItemComponent(product, true);
    cartContainer.append(rectangle, cartItemWrapper);

    decreaseButton.addEventListener('click', () => {
      updateQuantityProduct(product, -1);
      updateItemPriceAndQuantity(product, price, quantityCounter);
    });

    increaseButton.addEventListener('click', () => {
      updateQuantityProduct(product, 1);
      updateItemPriceAndQuantity(product, price, quantityCounter);
    });

    removeButton.addEventListener('click', () => {
      if (removeButton.classList.contains('cart-item__remove-button--restore')) {
        store.cart.push(product);
        store.removedProducts = store.removedProducts.filter((item) => item.id !== product.id);
        renderCart();
        renderQuantityProduct();
      }
    });
  });
  renderTotal();
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
