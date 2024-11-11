import { renderProducts } from './product.js';
import { filterProducts } from './filter.js';

const updateArrowDirection = (customSelect, sortBy) => {
  if (sortBy === 'asc') {
    customSelect.classList.add('custom-select--asc');
    customSelect.classList.remove('custom-select--desc');
  } else if (sortBy === 'desc') {
    customSelect.classList.add('custom-select--desc');
    customSelect.classList.remove('custom-select--asc');
  }
};

export const sortProduct = () => {
  const selectElement = document.querySelector('.custom-select__select');
  const customSelect = document.querySelector('.custom-select');

  selectElement.addEventListener('change', async () => {
    const sortBy = selectElement.value;

    const products = filterProducts();
    if (sortBy === 'asc') {
      products.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'desc') {
      products.sort((a, b) => b.price - a.price);
    }
    renderProducts(products);

    updateArrowDirection(customSelect, sortBy);
  });
};
