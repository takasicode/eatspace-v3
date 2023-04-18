import 'regenerator-runtime';
import '../styles/header.scss';
import '../styles/hero.scss';
import '../styles/loader.scss';
import '../styles/main.scss';
import '../styles/card.scss';
import '../styles/list.scss';
import '../styles/detail.scss';
import '../styles/footer.scss';
import '../styles/responsive.scss';
import './component/app-bar';
import './component/skip-content';
import './component/footer-bar';
import App from './views/app';
import swRegister from './utils/sw-register';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

const app = new App({
  button: document.querySelector('#menu_toggle'),
  drawer: document.querySelector('#drawer'),
  content: document.querySelector('main'),
});

window.addEventListener('hashchange', () => {
  app.renderPage();
});

window.addEventListener('load', () => {
  app.renderPage();
  swRegister();
});

const yearElement = document.getElementById('year');
const currentYear = new Date().getFullYear();
yearElement.textContent = currentYear;
