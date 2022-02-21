import { INbrbExchangeRatesExtendedData } from '../types';

const currenciesListElement = document.getElementById('currencies-list');
const baseCurrencyAbbreviationElement = document.getElementById('base-currency-abbreviation');
const template = document.getElementById('template') as HTMLTemplateElement | null;
const templateCurrencyListItem = template ? template.content.getElementById('currency-list-item') : null;
const templateCurrencyAmountLabel = templateCurrencyListItem ? templateCurrencyListItem.querySelector('[data-amount-label]') : null;
const templateCurrencyAmountInput: HTMLInputElement | null = templateCurrencyListItem ? templateCurrencyListItem.querySelector('[data-amount-input]') : null;
const templateCurrencyRateValue = templateCurrencyListItem ? templateCurrencyListItem.querySelector('[data-currency-rate-value]') : null;
const templateDeleteCurrencyButton: HTMLButtonElement | null = templateCurrencyListItem ? templateCurrencyListItem.querySelector('[data-delete-currency-btn]') : null;

interface IRenderCurrenciesListParams {
  currenciesList: Set<string>,
  baseCurrencies: Set<string>,
  baseCurrencyAbbreviation: string,
  currencyAmount: number,
  currenciesData: INbrbExchangeRatesExtendedData[] | undefined,
  isClearListBeforeRender?: boolean,
}

export const renderCurrenciesList = (params: IRenderCurrenciesListParams): void => {
  const {
    currenciesList,
    baseCurrencies,
    baseCurrencyAbbreviation,
    currencyAmount,
    currenciesData,
    isClearListBeforeRender = true,
  } = params;

  if (!templateCurrencyListItem || !currenciesListElement || !currenciesData) {
    return;
  }

  const currenciesListToRender = currenciesData.filter(currency => currenciesList.has(currency.Cur_Abbreviation));
  const baseCurrencyData: INbrbExchangeRatesExtendedData | undefined = currenciesListToRender.find(currency => currency.Cur_Abbreviation === baseCurrencyAbbreviation);

  if (!baseCurrencyData) {
    return;
  }

  if (baseCurrencyAbbreviationElement) {
    baseCurrencyAbbreviationElement.textContent = `${baseCurrencyAbbreviation}`;
  }
  // clear HTML currencies list element
  if (isClearListBeforeRender) {
    currenciesListElement.textContent = '';
  }

  currenciesListToRender.forEach(currency => {
    if (!templateCurrencyAmountLabel || !templateCurrencyAmountInput || !templateCurrencyRateValue || !templateDeleteCurrencyButton) {
      return;
    }

    templateCurrencyAmountLabel.textContent = `${currency.Cur_Name_Eng} (${currency.Cur_Abbreviation})`;
    templateCurrencyAmountLabel.setAttribute('data-currency-abbreviation', `${currency.Cur_Abbreviation}`);

    templateCurrencyAmountInput.value = `${(baseCurrencyData.ratePerOneUnit / currency.ratePerOneUnit * currencyAmount).toFixed(2)}`;
    templateCurrencyAmountInput.setAttribute('data-currency-abbreviation', `${currency.Cur_Abbreviation}`);
    if (currency.Cur_Abbreviation === baseCurrencyAbbreviation) {
      templateCurrencyAmountInput.autofocus = true;
    }

    templateCurrencyRateValue.textContent = `1 ${currency.Cur_Abbreviation} = ${(currency.ratePerOneUnit / baseCurrencyData.ratePerOneUnit).toFixed(4)} ${baseCurrencyAbbreviation}`;

    templateDeleteCurrencyButton.disabled = baseCurrencies.has(currency.Cur_Abbreviation);
    templateDeleteCurrencyButton.setAttribute('data-currency-abbreviation', `${currency.Cur_Abbreviation}`);

    const currencyListItem = templateCurrencyListItem.cloneNode(true);
    currenciesListElement.appendChild(currencyListItem);
  });
};
