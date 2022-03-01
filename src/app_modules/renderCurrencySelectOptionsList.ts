const currencySelectElement = document.getElementById('currency-select') as HTMLSelectElement | null;

export const renderCurrencySelectOptionsList = (baseCurrencyAbbreviation: string, currenciesList: Set<string>): void => {
  if (!currencySelectElement) {
    return;
  }

  currencySelectElement.innerText = '';

  currenciesList.forEach(currencyAbbreviation => {
    currencySelectElement.insertAdjacentHTML(
      'beforeend',
      `<option value=${currencyAbbreviation} ${currencyAbbreviation === baseCurrencyAbbreviation ? 'selected disabled' : ''} data-currency-select-option>${currencyAbbreviation}</option>`,
    );
  });
};

export const changeCurrencySelectOptionsAttributes = (baseCurrencyAbbreviation: string): void => {
  if (!currencySelectElement) {
    return;
  }

  const selectOptions = document.querySelectorAll('[data-currency-select-option]');

  selectOptions.forEach(option => {
    const optionElement = option as HTMLOptionElement;

    if (optionElement.value === baseCurrencyAbbreviation) {
      option.setAttribute('selected','');
      option.setAttribute('disabled','');
    } else {
      option.removeAttribute('selected');
      option.removeAttribute('disabled');
    }
  });

  currencySelectElement.value = baseCurrencyAbbreviation;
};
