import { getSpecifedDateExchangeRates } from './api/nbrb';
import {
  getCurrentThemeType,
  setInitialThemeTypeOnElement,
  changeThemeType,
} from './app_modules/themeSwitcher';
import { snackBarHandler } from './app_modules/snackBar';

import './styles.scss';

/* variables */
const themeAttributeElement = document.body;
const changeThemeTypeBtn = document.querySelector('button.theme-switcher');
const fetchDataBtn = document.querySelector('button.fetch-data-btn');

/* initial states */
setInitialThemeTypeOnElement(themeAttributeElement);

/* listners */
fetchDataBtn?.addEventListener('click', () => {
  getSpecifedDateExchangeRates('2022-2-17')
    .then(res => console.log(res))
    .catch(err => snackBarHandler(err, 6000));
});

changeThemeTypeBtn?.addEventListener('click', () => changeThemeType(getCurrentThemeType(), themeAttributeElement));
