import {
  INbrbExchangeRatesData,
  INbrbCurrenciesData,
  INbrbExchangeRatesExtendedData,
} from '../types';

const spinner = document.querySelector('.spinner');

const NBRB_API_ENDPOINT_URL = 'https://www.nbrb.by/api/exrates/';
const NBRB_API_EXCHANGE_RATES_DATA_ENDPOINT_URL = `${NBRB_API_ENDPOINT_URL}/rates?periodicity=0`;
const NBRB_API_CURRENCIES_DATA_ENDPOINT_URL = `${NBRB_API_ENDPOINT_URL}/currencies/`;
let cachedCurrenciesData: INbrbCurrenciesData[] = [];

export const getSpecifedDateNbrbExchangeRates = async (date: string): Promise<INbrbExchangeRatesData[]> => {
  const response = await fetch(`${NBRB_API_EXCHANGE_RATES_DATA_ENDPOINT_URL}&ondate=${date}`);

  if (response.ok) {
    const data = await response.json();
    return data;
  }

  throw new Error('Network error:' + response.status);
};

export const getNbrbCurrenciesData = async (): Promise<INbrbCurrenciesData[]> => {
  const response = await fetch(NBRB_API_CURRENCIES_DATA_ENDPOINT_URL);

  if (response.ok) {
    const data = await response.json();
    return data;
  }

  throw new Error('Network error:' + response.status);
};

export const getSpecifedDateExchangeRates = async (date: string): Promise<INbrbExchangeRatesExtendedData[]> => {
  try {
    spinner?.classList.add('spinner--active');
    const exchangeRates = await getSpecifedDateNbrbExchangeRates(date);

    if (!cachedCurrenciesData.length) {
      cachedCurrenciesData = await getNbrbCurrenciesData();
    }

    return exchangeRates.map(exchangeRate => {
      const { Cur_Name_Eng, Cur_QuotName_Eng, Cur_Name_EngMulti } = cachedCurrenciesData.find(currency => currency.Cur_ID === exchangeRate.Cur_ID) as INbrbCurrenciesData;

      return { ...exchangeRate, Cur_Name_Eng, Cur_QuotName_Eng, Cur_Name_EngMulti };
    });
  } catch (error: unknown) {
    throw new Error(`${error}`);
  } finally {
    spinner?.classList.remove('spinner--active');
  }
};
