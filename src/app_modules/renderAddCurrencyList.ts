import { INbrbExchangeRatesExtendedData } from '../types';

const availableCurrenciesListElement = document.getElementById('available-currencies-list');

export const renderAddCurrencyList = (currenciesData: INbrbExchangeRatesExtendedData[], currenciesList: Set<string>): void => {
  if (!availableCurrenciesListElement) {
    return;
  }
  const availableCurrenciesListData = currenciesData.filter(currency => !currenciesList.has(currency.Cur_Abbreviation));

  availableCurrenciesListElement.innerText = '';

  availableCurrenciesListData.forEach(currency => {
    availableCurrenciesListElement.insertAdjacentHTML(
      'beforeend',
      `<div class="add-currencies__checkbox-wrapper">
        <input class="add-currencies__input" type="checkbox" id=${currency.Cur_ID}-${currency.Cur_Abbreviation} name=${currency.Cur_Abbreviation}>
        <label class="add-currencies__label" for=${currency.Cur_ID}-${currency.Cur_Abbreviation} data-currency-abbreviation=${currency.Cur_Abbreviation}>${currency.Cur_Name_Eng} (${currency.Cur_Abbreviation})</label>
      </div>`,
    );
  });
};
