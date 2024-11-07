import createElement from './components/createElement';

const container = createElement('div', 'container');
export default function renderApp() {
  document.body.append(container);
  container.append();
}
