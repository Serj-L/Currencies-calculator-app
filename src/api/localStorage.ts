import { LocalStorageKeys, ILocalStorageAppData } from '../types';

export const getDataFromLocalStorage = (key: LocalStorageKeys): ILocalStorageAppData => {
  const data = localStorage.getItem(key) as string;

  return JSON.parse(data);
};

export const setDataToLocalStorage = (key: LocalStorageKeys, data: ILocalStorageAppData): void => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const initializedLocalStorageData = (key: LocalStorageKeys, initialValues: ILocalStorageAppData): void => {
  const data = localStorage.getItem(key);

  if (data) {
    return;
  }

  setDataToLocalStorage(key, initialValues);
};
