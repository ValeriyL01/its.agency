import { renderProducts, productsCache } from './product.js';

export const filterProducts = () => {
  const isNewChecked = document.getElementById('check-apple').checked;
  const inStockChecked = document.getElementById('check-orange').checked;
  const isNewCheckedPopup = document.getElementById('check-popup-new').checked;
  const inStockCheckedPopup = document.getElementById('check-popup-stock').checked;
  let filteredProducts = [...productsCache];
  if (isNewChecked || isNewCheckedPopup) {
    filteredProducts = filteredProducts.filter((product) => product.isNew);
  }

  if (inStockChecked || inStockCheckedPopup) {
    filteredProducts = filteredProducts.filter((product) => product.inStock);
  }

  return filteredProducts;
};
export const filterProductByCheckbox = () => {
  const checkboxes = document.querySelectorAll('.filter__checkbox-input');

  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', () => {
      const filteredProducts = filterProducts();

      renderProducts(filteredProducts);
    });
  });
};
const checkboxInputs = document.querySelectorAll('.filter__checkbox-input');

// отмена скролла при переключении чекбоксов
checkboxInputs.forEach((checkbox) => {
  checkbox.addEventListener('click', () => {
    const scrollPosition = window.scrollY;
    window.scrollTo(0, scrollPosition);
  });
});
