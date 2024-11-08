const mobileFilterButton = document.querySelector('.catalog__mobile-filter');
const overlay = document.getElementById('overlay');
const filterPopup = document.querySelector('.filter-popup');

function showFilterPopup() {
  overlay.classList.add('show');
  filterPopup.classList.add('show');
}

function hideFilterPopup() {
  overlay.classList.remove('show');
  filterPopup.classList.remove('show');
}

function initFilters() {
  mobileFilterButton.addEventListener('click', showFilterPopup);

  overlay.addEventListener('click', hideFilterPopup);
}

export { initFilters };
