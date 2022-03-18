import { INbrbExchangeRatesExtendedData } from '../types';

interface IRenderAddCurrencyList {
  addCurrenciesListElement: HTMLElement | null,
  currenciesData: INbrbExchangeRatesExtendedData[],
  userCurrenciesList: string[],
}

export const renderAddCurrencyList = ({
  addCurrenciesListElement,
  currenciesData,
  userCurrenciesList,
}: IRenderAddCurrencyList): void => {
  if (!addCurrenciesListElement) {
    return;
  }
  const availableCurrenciesListData = currenciesData.filter(currency => !userCurrenciesList.includes(currency.Cur_Abbreviation));

  addCurrenciesListElement.innerText = '';

  availableCurrenciesListData.forEach(currency => {
    addCurrenciesListElement.insertAdjacentHTML(
      'beforeend',
      `<div class="add-currencies__checkbox-wrapper">
        <input
          class="add-currencies__input"
          type="checkbox"
          id=${currency.Cur_ID}-${currency.Cur_Abbreviation}
          name=${currency.Cur_Abbreviation}
          data-add-currencies-checkbox
        >
        <label
          class="add-currencies__label"
          for=${currency.Cur_ID}-${currency.Cur_Abbreviation}
          data-add-currencies-label
          data-currency-abbreviation=${currency.Cur_Abbreviation}
        >
          ${currency.Cur_Name_Eng} (${currency.Cur_Abbreviation})
        </label>
      </div>`,
    );
  });
};
