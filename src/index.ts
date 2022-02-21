import { getSpecifedDateExchangeRates } from './api/nbrb';
import { initializedLocalStorageData, getDataFromLocalStorage } from './api/localStorage';

import { INbrbExchangeRatesExtendedData, LocalStorageKeys, ThemeTypes } from './types';
import {
  getCurrentThemeType,
  setInitialThemeTypeOnElement,
  changeThemeType,
  renderCurrenciesList,
  setDatePickerInitialState,
} from './app_modules';

import './styles.scss';

/* variables */
const themeAttributeElement = document.body;
const changeThemeTypeBtn = document.getElementById('theme-switcher');
const initialThemeType = window.matchMedia && window.window.matchMedia('(prefers-color-scheme: dark)').matches ? ThemeTypes.DARK : ThemeTypes.LIGHT;
const datepicker = document.getElementById('date-picker');
const currentDate = new Date();
let baseCurrencyAbbreviation = 'BYN';
const baseCurrencies = new Set (['BYN', 'RUB', 'USD', 'EUR', 'CNY']);
const defaultAmmount = 10;
let userCurrencyAmmount: number;
let userCurrenciesList: Set<string>;
const currenciesData: INbrbExchangeRatesExtendedData[] = [];

/* initial processes */
initializedLocalStorageData(LocalStorageKeys.MAIN, {
  themeType: initialThemeType,
  baseCurrencyAbbreviation,
  currencyAmount: defaultAmmount,
  currenciesList: Array.from(baseCurrencies),
});
baseCurrencyAbbreviation = getDataFromLocalStorage(LocalStorageKeys.MAIN).baseCurrencyAbbreviation;
userCurrencyAmmount = getDataFromLocalStorage(LocalStorageKeys.MAIN).currencyAmount;
userCurrenciesList = new Set(getDataFromLocalStorage(LocalStorageKeys.MAIN).currenciesList);

setInitialThemeTypeOnElement(themeAttributeElement);
setDatePickerInitialState(datepicker, currentDate, new Date(2020, 0, 1), currentDate);

// render currencies list
getSpecifedDateExchangeRates(currentDate)
  .then(currenciesDataFromAPI => {
    renderCurrenciesList({
      currenciesList: userCurrenciesList,
      baseCurrencies,
      baseCurrencyAbbreviation,
      currenciesData: currenciesDataFromAPI,
      currencyAmount: userCurrencyAmmount,
    });
    if (currenciesDataFromAPI?.length) {
      currenciesData.push(...currenciesDataFromAPI);
    }
  });

/* listners */
changeThemeTypeBtn?.addEventListener('click', () => changeThemeType(getCurrentThemeType(), themeAttributeElement));
