import { swiperСontrol } from './js/slider';
import { initialize } from './components/product';
import { sortProduct } from './components/select';
import { filterProductByCheckbox } from './components/filter';
import { initFilters } from './components/popupFilter';

export default function renderApp() {
  swiperСontrol();
  initialize();
  sortProduct();
  filterProductByCheckbox();
  initFilters();
}
