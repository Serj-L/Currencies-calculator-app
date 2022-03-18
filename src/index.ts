import { getSpecifedDateExchangeRates } from './api/nbrb';
import {
  initializedLocalStorageData,
  getDataFromLocalStorage,
  setDataToLocalStorage,
} from './api/localStorage';

import {
  INbrbExchangeRatesExtendedData,
  LocalStorageKeys,
  ThemeTypes,
} from './types';

import {
  getCurrentThemeType,
  setInitialThemeTypeOnElement,
  changeThemeType,
  renderCurrenciesList,
  renderAddCurrencyList,
  renderCurrencySelectOptionsList,
  changeCurrencySelectOptionsAttributes,
  changeIsBaseCurrencyAttribute,
  setDatePickerParams,
  dragNdropHandler,
  warningElementHandler,
  snackBarHandler,
  scrollTopActivate,
} from './app_modules';

import {
  dateToStringConverter,
  debounce,
} from './utils';

import './styles.scss';

/* Variables */
const themeAttributeElement = document.body;
const changeThemeTypeBtn = document.getElementById('theme-switcher');
const datePickerElement = document.getElementById('date-picker');
const baseCurrencySelectElement = document.getElementById('currency-select') as HTMLSelectElement | null;
const currenciesListElement = document.getElementById('currencies-list');
const addCurrenciesBtnElement = document.getElementById('add-currencies-btn');
const addCurrenciesFormElement = document.getElementById('add-currencies-form');
const addCurrenciesListElement = document.getElementById('available-currencies-list');
const addCurrenciesResetBtnElement = document.getElementById('add-currencies-reset-btn');
const additinalInfoElement = document.getElementById('calculator-additional-info');
const currentDate = new Date();
const datePickerMinDate = new Date(2020, 0, 1);
const initialThemeType = window.matchMedia && window.window.matchMedia('(prefers-color-scheme: dark)').matches ? ThemeTypes.DARK : ThemeTypes.LIGHT;
const defaultBaseCurrency = 'BYN';
let baseCurrencyAbbreviation = defaultBaseCurrency;
const baseCurrencies = new Set (['BYN', 'USD', 'EUR', 'RUB', 'CNY']);
const defaultAmmount = 10;
let userCurrencyAmmount: number;
let userCurrenciesList: string[];
const currenciesData: INbrbExchangeRatesExtendedData[] = [];

/* Initial processes */
initializedLocalStorageData(LocalStorageKeys.MAIN, {
  themeType: initialThemeType,
  baseCurrencyAbbreviation,
  currencyAmount: defaultAmmount,
  currenciesList: Array.from(baseCurrencies),
});
baseCurrencyAbbreviation = getDataFromLocalStorage(LocalStorageKeys.MAIN).baseCurrencyAbbreviation;
userCurrencyAmmount = getDataFromLocalStorage(LocalStorageKeys.MAIN).currencyAmount;
userCurrenciesList = getDataFromLocalStorage(LocalStorageKeys.MAIN).currenciesList;

setInitialThemeTypeOnElement(themeAttributeElement);

setDatePickerParams({
  datePickerElement,
  date: currentDate,
  minDate: datePickerMinDate,
  maxDate: currentDate,
});

scrollTopActivate(300);

// Render currencies list and conrols elements lists (addCurrency available currencies list and currencySelect options)
getSpecifedDateExchangeRates(currentDate)
  .then(currenciesDataFromAPI => {
    renderCurrenciesList({
      currenciesListElement,
      currenciesList: userCurrenciesList,
      baseCurrencies,
      baseCurrencyAbbreviation,
      currenciesData: currenciesDataFromAPI,
      currencyAmount: userCurrencyAmmount,
    });
    if (currenciesDataFromAPI?.length) {
      currenciesData.push(...currenciesDataFromAPI);
      renderAddCurrencyList({ addCurrenciesListElement, currenciesData, userCurrenciesList });
      renderCurrencySelectOptionsList({ baseCurrencySelectElement, baseCurrencyAbbreviation, userCurrenciesList });
      additinalInfoElement?.classList.add('calculator__additional-info--active');
    } else {
      warningElementHandler({
        message: 'Ups, something went wrong &#128533',
        containerElement: document.getElementById('currencies-list'),
        tagName: 'li',
        tagClassName: 'calculator__currencies-list-warning',
        textTagClassName: 'calculator__currencies-list-warning-text',
      });
    }
  });

/* Listners and handlers */

// Change theme button handler
changeThemeTypeBtn?.addEventListener('click', () => changeThemeType(getCurrentThemeType(), themeAttributeElement));

// Date picker handler + debouncer
function datePickerHandler(event: Event): void {
  if (!event) {
    return;
  }

  const datePicker = event.target as HTMLInputElement;
  let date = datePicker.valueAsDate;

  if (!date) {
    return;
  }
  // check is date in the acceptable range (from minDate to maxDate)
  const minDate = new Date(datePicker.min);
  const maxDate = new Date(datePicker.max);
  if (minDate && date < minDate) {
    datePicker.value = dateToStringConverter(minDate);
    date = minDate;
    snackBarHandler(`Entered date can't be earlier than ${datePicker.min}`, 10000);
  }
  if (maxDate && date > maxDate) {
    datePicker.value = dateToStringConverter(maxDate);
    date = maxDate;
    snackBarHandler(`Entered date can't be later than ${datePicker.max}`, 10000);
  }

  getSpecifedDateExchangeRates(date)
    .then(currenciesDataFromAPI => {
      renderCurrenciesList({
        currenciesListElement,
        currenciesList: userCurrenciesList,
        baseCurrencies,
        baseCurrencyAbbreviation,
        currenciesData: currenciesDataFromAPI,
        currencyAmount: userCurrencyAmmount,
      });
      if (currenciesDataFromAPI?.length) {
        currenciesData.length = 0;
        currenciesData.push(...currenciesDataFromAPI);
        renderAddCurrencyList({ addCurrenciesListElement, currenciesData, userCurrenciesList });
      } else {
        datePicker.value = dateToStringConverter(currentDate);
      }
    });
}
const debouncedDatePickerHandler = debounce(datePickerHandler, 600);
datePickerElement?.addEventListener('input', (event: Event) => debouncedDatePickerHandler(event));

// Base currency change handler
baseCurrencySelectElement?.addEventListener('change', (event: Event): void => {
  const selectElement = event.target as HTMLSelectElement | null;

  if (!selectElement) {
    return;
  }
  const newBaseCurrencyAbbreviation = selectElement.value;
  const baseCurrencyData = currenciesData.find(currency => currency.Cur_Abbreviation === newBaseCurrencyAbbreviation) as INbrbExchangeRatesExtendedData;
  const currencyRateValueElements = document.querySelectorAll('[data-currency-rate-value]');
  const currencyAmountInputs = document.querySelectorAll('[data-amount-input]');

  currencyRateValueElements.forEach(currency => {
    const currencyAbbreviation = currency.getAttribute('data-currency-abbreviation') as string;
    const currencyData = currenciesData.find(currency => currency.Cur_Abbreviation === currencyAbbreviation) as INbrbExchangeRatesExtendedData;

    currency.textContent = `1 ${currencyData.Cur_Abbreviation} = ${(currencyData.ratePerOneUnit / baseCurrencyData.ratePerOneUnit).toFixed(4)} ${newBaseCurrencyAbbreviation}`;
  });

  baseCurrencyAbbreviation = newBaseCurrencyAbbreviation;
  changeIsBaseCurrencyAttribute({ currenciesListElement, baseCurrencyAbbreviation });
  changeCurrencySelectOptionsAttributes({ baseCurrencySelectElement, baseCurrencyAbbreviation });
  setDataToLocalStorage(LocalStorageKeys.MAIN, 'baseCurrencyAbbreviation', baseCurrencyAbbreviation);

  // setting new base currency amount
  currencyAmountInputs.forEach(input => {
    const inputElement = input as HTMLInputElement;

    if (inputElement.getAttribute('data-currency-abbreviation') !== baseCurrencyAbbreviation) {
      return;
    }

    userCurrencyAmmount = inputElement.valueAsNumber;
    setDataToLocalStorage(LocalStorageKeys.MAIN, 'currencyAmount', userCurrencyAmmount);
  });

  selectElement.blur();
});

// Currency amount input handler + debouncer
function currencyAmountInputHandler (event: Event): void {
  if (!event) {
    return;
  }
  const inputElement = event.target as HTMLInputElement;
  const newAmountValue = inputElement.valueAsNumber;
  const newBaseCurrencyAbbreviation = inputElement.getAttribute('data-currency-abbreviation') as string;
  let baseCurrencyData: INbrbExchangeRatesExtendedData;

  // actions if base currency is changed
  if (newBaseCurrencyAbbreviation !== baseCurrencyAbbreviation) {
    const currencyRateValueElements = document.querySelectorAll('[data-currency-rate-value]');

    baseCurrencyData = currenciesData.find(currency => currency.Cur_Abbreviation === newBaseCurrencyAbbreviation) as INbrbExchangeRatesExtendedData;

    currencyRateValueElements.forEach(currency => {
      const currencyAbbreviation = currency.getAttribute('data-currency-abbreviation') as string;
      const currencyData = currenciesData.find(currency => currency.Cur_Abbreviation === currencyAbbreviation) as INbrbExchangeRatesExtendedData;

      currency.textContent = `1 ${currencyData.Cur_Abbreviation} = ${(currencyData.ratePerOneUnit / baseCurrencyData.ratePerOneUnit).toFixed(4)} ${newBaseCurrencyAbbreviation}`;
    });

    baseCurrencyAbbreviation = newBaseCurrencyAbbreviation;
    changeIsBaseCurrencyAttribute({ currenciesListElement, baseCurrencyAbbreviation });
    changeCurrencySelectOptionsAttributes({ baseCurrencySelectElement, baseCurrencyAbbreviation });
    setDataToLocalStorage(LocalStorageKeys.MAIN, 'baseCurrencyAbbreviation', baseCurrencyAbbreviation);
  } else {
    baseCurrencyData = currenciesData.find(currency => currency.Cur_Abbreviation === baseCurrencyAbbreviation) as INbrbExchangeRatesExtendedData;
  }
  // handle changing currency amount
  if (isNaN(newAmountValue)) {
    return;
  }

  const currencyAmountInputElements = document.querySelectorAll('[data-amount-input]');

  currencyAmountInputElements.forEach(input => {
    if (input.getAttribute('data-currency-abbreviation') === baseCurrencyAbbreviation) {
      return;
    }
    const currencyAbbreviation = input.getAttribute('data-currency-abbreviation') as string;
    const inputElement = input as HTMLInputElement;
    const currencyData = currenciesData.find(currency => currency.Cur_Abbreviation === currencyAbbreviation) as INbrbExchangeRatesExtendedData;

    inputElement.value = newAmountValue < 0 ? '0.00' : (baseCurrencyData.ratePerOneUnit / currencyData.ratePerOneUnit * newAmountValue).toFixed(2);
  });

  userCurrencyAmmount = newAmountValue < 0 ? 0 : newAmountValue;
  setDataToLocalStorage(LocalStorageKeys.MAIN, 'currencyAmount', userCurrencyAmmount);
  // entered currency amount formating
  setTimeout(() => {
    inputElement.value = userCurrencyAmmount.toFixed(2);
  }, 3000);
}
const debouncedCurrencyAmountInputHandler = debounce(currencyAmountInputHandler, 400);
currenciesListElement?.addEventListener('input', (event: Event) => debouncedCurrencyAmountInputHandler(event));

// Add currencies list open/close button click handler
addCurrenciesBtnElement?.addEventListener('click', (): void => {
  addCurrenciesBtnElement.classList.toggle('add-currencies__btn--active');
  addCurrenciesListElement?.scrollTo(0, 0);
  addCurrenciesFormElement?.classList.toggle('add-currencies__form--active');
  addCurrenciesResetBtnElement?.click();
});

// add currencies close list handlers (Esc key press and click out of specified elements)
const closeAddCurrenciesList = (): void => {
  addCurrenciesBtnElement?.classList.remove('add-currencies__btn--active');
  addCurrenciesFormElement?.classList.remove('add-currencies__form--active');
};
// escape key press handler
document.body.addEventListener('keyup', (event: KeyboardEvent): void => {
  if (!addCurrenciesFormElement?.classList.contains('add-currencies__form--active')) {
    return;
  }
  if (event.key === 'Escape') {
    closeAddCurrenciesList();
    addCurrenciesResetBtnElement?.click();
  }
});
// click out of specified elements handler
document.body.addEventListener('click', (event: Event): void => {
  if (!event) {
    return;
  }

  const targetElement = event.target as HTMLElement | null;
  const isAddCurrenciesFormActive = addCurrenciesFormElement?.classList.contains('add-currencies__form--active');

  if (!targetElement || !isAddCurrenciesFormActive) {
    return;
  }

  const isTargetElementAddCurrenciesBtn = targetElement.closest('button')?.id === 'add-currencies-btn';
  const isTargetElementAddCurrenciesForm = targetElement.id === 'add-currencies-form';
  const isTargetElementAddCurrenciesSubmitBtn = targetElement.id === 'add-currencies-submit-btn';
  const isTargetElementAddCurrenciesResetBtn = targetElement.id === 'add-currencies-reset-btn';
  const isTargetElementAddCurrenciesLabel = targetElement.hasAttribute('data-add-currencies-label');
  const isTargetElementAddCurrenciesCheckbox = 'addCurrenciesCheckbox' in targetElement.dataset;

  if (isTargetElementAddCurrenciesBtn
    || isTargetElementAddCurrenciesForm
    || isTargetElementAddCurrenciesCheckbox
    || isTargetElementAddCurrenciesLabel
    || isTargetElementAddCurrenciesSubmitBtn
    || isTargetElementAddCurrenciesResetBtn) {
    return;
  }
  closeAddCurrenciesList();
  addCurrenciesResetBtnElement?.click();
});

// Add currencies from addCurrencyList handler
addCurrenciesFormElement?.addEventListener('submit', (event: Event): void => {
  if (!event || !event.target) {
    return;
  }

  event.preventDefault();
  closeAddCurrenciesList();

  const formElement = event.target as HTMLFormElement;
  const formData = Object.fromEntries(new FormData(formElement).entries());
  const choosenCurrenciesList = Object.keys(formData);

  if (!choosenCurrenciesList.length) {
    return;
  }

  userCurrenciesList = [...userCurrenciesList, ...choosenCurrenciesList];

  renderCurrenciesList({
    currenciesListElement,
    currenciesList: choosenCurrenciesList,
    baseCurrencies,
    baseCurrencyAbbreviation,
    currenciesData,
    currencyAmount: userCurrencyAmmount,
    isClearListBeforeRender: false,
    startingOrderPosition: userCurrenciesList.length - choosenCurrenciesList.length, //needed for drag'n'drop currencies list reorder functionality
  });
  renderAddCurrencyList({ addCurrenciesListElement, currenciesData, userCurrenciesList });
  renderCurrencySelectOptionsList({ baseCurrencySelectElement, baseCurrencyAbbreviation, userCurrenciesList });
  setDataToLocalStorage(LocalStorageKeys.MAIN, 'currenciesList', userCurrenciesList);
});

// Delete currencyCard button click handler
currenciesListElement?.addEventListener('click', (event: Event): void => {
  if (!event) {
    return;
  }

  const target = event.target as HTMLElement;
  if (target.tagName !== 'BUTTON') {
    return;
  }

  const removedCurrencyCardElement = target.closest('[data-currency-list-item]');
  const removedCurrencyAbbreviation = target.getAttribute('data-currency-abbreviation');

  if (!removedCurrencyCardElement || !removedCurrencyAbbreviation) {
    return;
  }

  userCurrenciesList = userCurrenciesList.filter(currency => currency !== removedCurrencyAbbreviation);
  renderAddCurrencyList({ addCurrenciesListElement, currenciesData, userCurrenciesList });
  setDataToLocalStorage(LocalStorageKeys.MAIN, 'currenciesList', userCurrenciesList);
  currenciesListElement.removeChild(removedCurrencyCardElement);

  // set base currency, curency amount to default values and recalculate exchange rates if removed currency is current base currency
  if (removedCurrencyAbbreviation === baseCurrencyAbbreviation) {
    baseCurrencyAbbreviation = defaultBaseCurrency;
    changeIsBaseCurrencyAttribute({ currenciesListElement, baseCurrencyAbbreviation });

    const currencyRateValueElements = document.querySelectorAll('[data-currency-rate-value]');
    const baseCurrencyData = currenciesData.find(currency => currency.Cur_Abbreviation === baseCurrencyAbbreviation) as INbrbExchangeRatesExtendedData;

    currencyRateValueElements.forEach(currency => {
      const currencyAbbreviation = currency.getAttribute('data-currency-abbreviation') as string;
      const currencyData = currenciesData.find(currency => currency.Cur_Abbreviation === currencyAbbreviation) as INbrbExchangeRatesExtendedData;

      currency.textContent = `1 ${currencyData.Cur_Abbreviation} = ${(currencyData.ratePerOneUnit / baseCurrencyData.ratePerOneUnit).toFixed(4)} ${baseCurrencyAbbreviation}`;
    });

    setDataToLocalStorage(LocalStorageKeys.MAIN, 'baseCurrencyAbbreviation', baseCurrencyAbbreviation);
    userCurrencyAmmount = defaultAmmount;
    setDataToLocalStorage(LocalStorageKeys.MAIN, 'currencyAmount', userCurrencyAmmount);
  }

  renderCurrencySelectOptionsList({ baseCurrencySelectElement, baseCurrencyAbbreviation, userCurrenciesList });
  // changing currencyCards order numbers attribute (needed for drag'n'drop currencies list reorder functionality)
  document.querySelectorAll('[data-currency-list-item]').forEach((currencyCard, index) => {
    currencyCard.setAttribute('data-order-number', `${index}`);
  });
});

// Drag'n'drop reorder currencies list handlers
currenciesListElement?.addEventListener('mousedown', (evt) => dragNdropHandler({ evt, currenciesListElement, userCurrenciesList, baseCurrencyAbbreviation, baseCurrencySelectElement }));
currenciesListElement?.addEventListener('touchstart', (evt) => dragNdropHandler({ evt, currenciesListElement, userCurrenciesList, baseCurrencyAbbreviation, baseCurrencySelectElement }));
