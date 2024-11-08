import createElement from './components/createElement';
import { swiperСontrol } from './js/slider';

const container = createElement('div', 'container');
export default function renderApp() {
  document.body.append(container);
  container.append();
  swiperСontrol();
}
