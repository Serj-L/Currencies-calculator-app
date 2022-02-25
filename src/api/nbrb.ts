import {
  INbrbExchangeRatesData,
  INbrbCurrenciesData,
  INbrbExchangeRatesExtendedData,
} from '../types';
import {
  setSpinnerActive,
  snackBarHandler,
} from '../app_modules';
import { dateToStringConverter } from '../utils';

const NBRB_API_ENDPOINT_URL = 'https://www.nbrb.by/api/exrates/';
const NBRB_API_EXCHANGE_RATES_DATA_ENDPOINT_URL = `${NBRB_API_ENDPOINT_URL}/rates?periodicity=0`;
const NBRB_API_CURRENCIES_DATA_ENDPOINT_URL = `${NBRB_API_ENDPOINT_URL}/currencies/`;

let cachedCurrenciesData: INbrbCurrenciesData[] = [];

export const getSpecifedDateNbrbExchangeRates = async (date: Date): Promise<INbrbExchangeRatesData[]> => {
  const response = await fetch(`${NBRB_API_EXCHANGE_RATES_DATA_ENDPOINT_URL}&ondate=${dateToStringConverter(date)}`);

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

export const getSpecifedDateExchangeRates = async (date: Date): Promise<INbrbExchangeRatesExtendedData[] | undefined> => {
  try {
    setSpinnerActive(true);
    const exchangeRates = await getSpecifedDateNbrbExchangeRates(date);
    let extendedExchangeRates: INbrbExchangeRatesExtendedData[] = [];

    if (!cachedCurrenciesData.length) {
      cachedCurrenciesData = await getNbrbCurrenciesData();
    }

    extendedExchangeRates = exchangeRates.map(exchangeRate => {
      const { Cur_Name_Eng, Cur_QuotName_Eng, Cur_Name_EngMulti } = cachedCurrenciesData.find(currency => currency.Cur_ID === exchangeRate.Cur_ID) as INbrbCurrenciesData;
      const ratePerOneUnit = exchangeRate.Cur_OfficialRate / exchangeRate.Cur_Scale;

      return { ...exchangeRate,
        Cur_Abbreviation: exchangeRate.Cur_Abbreviation.toUpperCase(),
        Cur_Name_Eng,
        Cur_QuotName_Eng,
        Cur_Name_EngMulti,
        ratePerOneUnit,
      };
    });

    // add Belarusian ruble info
    extendedExchangeRates.push({
      Cur_ID: 933,
      Date: extendedExchangeRates[0].Date,
      Cur_Abbreviation: 'BYN',
      Cur_Scale: 1,
      Cur_Name: 'Белорусский рубль',
      Cur_OfficialRate: 1,
      Cur_Name_Eng: 'Belarusian Ruble',
      Cur_QuotName_Eng: '1 Belarusian Ruble',
      Cur_Name_EngMulti: 'Belarusian Rubles',
      ratePerOneUnit: 1,
    });

    return extendedExchangeRates;
  } catch (error: any) {
    snackBarHandler(error.message, 10000);
  } finally {
    setSpinnerActive(false);
  }
};
