import { INbrbExchangeRatesExtendedData } from '../types';

const baseCurrencyAbbreviationElement = document.getElementById('base-currency-abbreviation');
const template = document.getElementById('template') as HTMLTemplateElement | null;
const templateCurrencyListItem = template ? template.content.querySelector('[data-currency-list-item]') : null;
const templateCurrencyAmountLabel = templateCurrencyListItem ? templateCurrencyListItem.querySelector('[data-amount-label]') : null;
const templateCurrencyAmountInput: HTMLInputElement | null = templateCurrencyListItem ? templateCurrencyListItem.querySelector('[data-amount-input]') : null;
const templateCurrencyRateValue = templateCurrencyListItem ? templateCurrencyListItem.querySelector('[data-currency-rate-value]') : null;
const templateDeleteCurrencyButton: HTMLButtonElement | null = templateCurrencyListItem ? templateCurrencyListItem.querySelector('[data-delete-currency-btn]') : null;

interface IRenderCurrenciesList {
  currenciesListElement: HTMLElement | null,
  currenciesList: string[],
  baseCurrencies: Set<string>,
  baseCurrencyAbbreviation: string,
  currencyAmount: number,
  currenciesData: INbrbExchangeRatesExtendedData[] | undefined,
  isClearListBeforeRender?: boolean,
  startingOrderPosition?: number;
}

interface IChangeIsBaseCurrencyAttribute {
  currenciesListElement: HTMLElement | null,
  baseCurrencyAbbreviation: string,
}

export const renderCurrenciesList = ({
  currenciesListElement,
  currenciesList,
  baseCurrencies,
  baseCurrencyAbbreviation,
  currencyAmount,
  currenciesData,
  isClearListBeforeRender = true,
  startingOrderPosition = 0,
}: IRenderCurrenciesList): void => {
  if (!templateCurrencyListItem || !currenciesListElement || !currenciesData) {
    return;
  }

  const currenciesListToRender: INbrbExchangeRatesExtendedData[] = [];
  currenciesList.forEach(currencyAbbreviation => {
    const currencyData = currenciesData.find(currency => currency.Cur_Abbreviation === currencyAbbreviation);
    if (currencyData) {
      currenciesListToRender.push(currencyData);
    }
  });

  const baseCurrencyData: INbrbExchangeRatesExtendedData | undefined = currenciesData.find(currency => currency.Cur_Abbreviation === baseCurrencyAbbreviation);

  if (!baseCurrencyData) {
    return;
  }

  if (baseCurrencyAbbreviationElement) {
    baseCurrencyAbbreviationElement.textContent = `${baseCurrencyAbbreviation}`;
  }
  // clear currencies list HTML element content
  if (isClearListBeforeRender) {
    currenciesListElement.textContent = '';
  }

  currenciesListToRender.forEach((currency, index) => {
    if (!templateCurrencyAmountLabel || !templateCurrencyAmountInput || !templateCurrencyRateValue || !templateDeleteCurrencyButton) {
      return;
    }
    templateCurrencyAmountLabel.textContent = `${currency.Cur_Name_Eng} (${currency.Cur_Abbreviation})`;
    templateCurrencyAmountLabel.setAttribute('data-currency-abbreviation', `${currency.Cur_Abbreviation}`);

    templateCurrencyAmountInput.value = (baseCurrencyData.ratePerOneUnit / currency.ratePerOneUnit * currencyAmount).toFixed(2);
    templateCurrencyAmountInput.setAttribute('data-currency-abbreviation', `${currency.Cur_Abbreviation}`);

    templateCurrencyRateValue.textContent = `1 ${currency.Cur_Abbreviation} = ${(currency.ratePerOneUnit / baseCurrencyData.ratePerOneUnit).toFixed(4)} ${baseCurrencyAbbreviation}`;
    templateCurrencyRateValue.setAttribute('data-currency-abbreviation', `${currency.Cur_Abbreviation}`);

    templateDeleteCurrencyButton.disabled = baseCurrencies.has(currency.Cur_Abbreviation);
    templateDeleteCurrencyButton.setAttribute('data-currency-abbreviation', `${currency.Cur_Abbreviation}`);

    const currencyListItem = templateCurrencyListItem.cloneNode(true) as HTMLLIElement;
    currencyListItem.setAttribute('data-currency-abbreviation', `${currency.Cur_Abbreviation}`);
    currencyListItem.setAttribute('data-order-number', `${startingOrderPosition + index}`);

    if (currency.Cur_Abbreviation === baseCurrencyAbbreviation) {
      currencyListItem.setAttribute('data-is-base-currency', 'true');
    }

    currenciesListElement.appendChild(currencyListItem);
  });
};

export const changeIsBaseCurrencyAttribute = ({
  currenciesListElement,
  baseCurrencyAbbreviation,
}: IChangeIsBaseCurrencyAttribute): void => {
  if (!currenciesListElement || !currenciesListElement.childNodes.length) {
    return;
  }

  currenciesListElement.childNodes.forEach(childNode => {
    const currencyListItem = childNode as HTMLLIElement;

    if (currencyListItem.getAttribute('data-currency-abbreviation') === baseCurrencyAbbreviation) {
      currencyListItem.setAttribute('data-is-base-currency', 'true');
    } else {
      currencyListItem.setAttribute('data-is-base-currency', 'false');
    }
  });
};
