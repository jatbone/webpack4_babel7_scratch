import { tns } from 'tiny-slider/src/tiny-slider';

import 'assets/styles/index.scss';
import 'tiny-slider/src/tiny-slider.scss';
// import * as serviceWorker from './serviceWorker';

// Show an element
const show = elem => {
  elem.classList.remove('hidden');
};

// Hide an element
const hide = elem => {
  elem.classList.add('hidden');
};

// Toggle element visibility
const toggle = elem => {
  elem.classList.toggle('hidden');
};

const slider = tns({
  container: '#slider',
  items: 1,
  slideBy: 'page',
  autoplay: true
});

window.onload = () => {
  const nav = document.querySelector('nav');
  const btnNavToggle = document.querySelector('.btn-nav-toggle');
  btnNavToggle.addEventListener('click', e => {
    e.preventDefault();
    toggle(nav);
  });
};

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
