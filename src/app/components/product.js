import createElement from './createElement.js';
import { fetchProducts } from '../../api/mockAPI.js';
import { store } from '../js/store.js';
import { addToCart, renderQuantityProduct } from './productInCart.js';

const handleAddToCartClick = (product) => {
  addToCart(product);
};

export const createProductComponent = (product) => {
  const productWrapper = createElement('div', 'product__item');

  const img = createElement('img', 'product__image', null, { src: product.avatar, alt: product.name });
  const name = createElement('h3', 'product__name', product.name);
  const price = createElement('p', 'product__price', `${product.price}₽`);
  const addToCartButton = createElement('button', 'product__button', '+', {
    'data-id': product.id,
  });

  const priceAddToCartButtonContainer = createElement('div', 'product__price-Button-container');
  const rectangle = createElement('div', 'product__rectangle');
  productWrapper.append(img, name, priceAddToCartButtonContainer, rectangle);
  priceAddToCartButtonContainer.append(price, addToCartButton);

  addToCartButton.addEventListener('click', () => handleAddToCartClick(product));

  return productWrapper;
};

export const renderProducts = (products) => {
  const productsContainer = document.getElementById('products-container');
  productsContainer.innerHTML = '';

  products.forEach((product) => {
    const productComponent = createProductComponent(product);
    productsContainer.append(productComponent);
  });
};

export const initialize = async () => {
  const products = await fetchProducts();
  store.productsCache.length = 0;
  store.productsCache.push(...products);
  renderProducts(store.productsCache);
  renderQuantityProduct();
};
