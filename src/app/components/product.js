import createElement from './createElement.js';
import { fetchProducts } from '../../api/mockAPI.js';

export const productsCache = [];
export const createProductComponent = (product) => {
  const productWrapper = createElement('div', 'product__item');

  const img = createElement('img', 'product__image', null, { src: product.avatar, alt: product.name });
  const name = createElement('h3', 'product__name', product.name);
  const price = createElement('p', 'product__price', `${product.price}₽`);
  const addToCartButton = createElement('button', 'product__button', '+', {
    'data-id': product.id,
  });
  const priceAddToCartButtonContainer = createElement('div', 'product__price-Button-container');
  productWrapper.append(img, name, priceAddToCartButtonContainer);
  priceAddToCartButtonContainer.append(price, addToCartButton);

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

const renderQuantityProduct = () => {
  const quantity = document.querySelector('.catalog__quantity');
  quantity.innerHTML = `${productsCache.length} товаров`;
};

export const initialize = async () => {
  const products = await fetchProducts();
  productsCache.length = 0;
  productsCache.push(...products);
  renderProducts(productsCache);
  renderQuantityProduct();
};
