import { swiperСontrol } from './js/slider';
import { initialize } from './js/product';
import { sortProduct } from './js/select';
import { filterProductByCheckbox } from './js/filter';
import { initFilters } from './js/popupFilter';
import { initCartPopup } from './js/popupCart';
import { initializeCart } from './js/productInCart';

export default function renderApp() {
  swiperСontrol();
  initialize();
  sortProduct();
  filterProductByCheckbox();
  initFilters();
  initCartPopup();
  initializeCart();
}
