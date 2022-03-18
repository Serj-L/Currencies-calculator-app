interface IChangeCurrencySelectOptionsAttributes {
  baseCurrencySelectElement: HTMLSelectElement | null,
  baseCurrencyAbbreviation: string,
}

interface IRrenderCurrencySelectOptionsList extends IChangeCurrencySelectOptionsAttributes {
  userCurrenciesList: string[],
}

export const renderCurrencySelectOptionsList = ({
  baseCurrencySelectElement,
  baseCurrencyAbbreviation,
  userCurrenciesList,
}: IRrenderCurrencySelectOptionsList): void => {
  if (!baseCurrencySelectElement) {
    return;
  }

  baseCurrencySelectElement.innerText = '';

  userCurrenciesList.forEach(currencyAbbreviation => {
    baseCurrencySelectElement.insertAdjacentHTML(
      'beforeend',
      `<option
        value=${currencyAbbreviation} ${currencyAbbreviation === baseCurrencyAbbreviation ? 'selected disabled' : ''}
        data-currency-select-option>${currencyAbbreviation}
      </option>`,
    );
  });
};

export const changeCurrencySelectOptionsAttributes = ({
  baseCurrencySelectElement,
  baseCurrencyAbbreviation,
}: IChangeCurrencySelectOptionsAttributes): void => {
  if (!baseCurrencySelectElement) {
    return;
  }

  const selectOptions = baseCurrencySelectElement.childNodes;

  selectOptions.forEach(option => {
    const optionElement = option as HTMLOptionElement;

    if (optionElement.value === baseCurrencyAbbreviation) {
      optionElement.setAttribute('selected','');
      optionElement.setAttribute('disabled','');
    } else {
      optionElement.removeAttribute('selected');
      optionElement.removeAttribute('disabled');
    }
  });

  baseCurrencySelectElement.value = baseCurrencyAbbreviation;
};
