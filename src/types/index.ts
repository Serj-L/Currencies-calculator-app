/* eslint-disable no-unused-vars */

export enum LocalStorageKeys {
  THEMETYPE = 'CurrenciesCalcAppThemeType',
}

export enum ThemeTypes {
  LIGHT = 'light',
  DARK = 'dark',
  ELEMENTATTR = 'data-theme-type',
}

export interface INbrbExchangeRatesData {
  Cur_ID: number,
  Date: string,
  Cur_Abbreviation: string,
  Cur_Scale: number,
  Cur_Name: string,
  Cur_OfficialRate: number,
}

export interface INbrbExchangeRatesExtendedData extends INbrbExchangeRatesData {
  Cur_Name_Eng: string,
  Cur_QuotName_Eng: string,
  Cur_Name_EngMulti: string | null,
}

export interface INbrbCurrenciesData {
  Cur_ID: number,
  Cur_Name_Eng: string,
  Cur_QuotName_Eng: string,
  Cur_Name_EngMulti: string | null,
}
