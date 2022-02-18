import { getSpecifedDateExchangeRates } from './api/nbrb';
import {
  getCurrentThemeType,
  setInitialThemeTypeOnElement,
  changeThemeType,
} from './app_modules/themeSwitcher';
import { snackBarHandler } from './app_modules/snackBar';
import { setDatePickerInitialState } from './app_modules/datePicker';

import './styles.scss';

/* variables */
const themeAttributeElement = document.body;
const changeThemeTypeBtn = document.getElementById('theme-switcher');
const datepicker = document.getElementById('date-picker');
const currentDate = new Date();
const fetchDataBtn = document.querySelector('button.fetch-data-btn');

/* initial states */
setInitialThemeTypeOnElement(themeAttributeElement);
setDatePickerInitialState(datepicker, currentDate, new Date(2020, 0, 1), currentDate);

/* listners */
fetchDataBtn?.addEventListener('click', () => {
  getSpecifedDateExchangeRates(currentDate)
    .then(res => console.log(res))
    .catch(err => snackBarHandler(err, 6000));
});

changeThemeTypeBtn?.addEventListener('click', () => changeThemeType(getCurrentThemeType(), themeAttributeElement));
