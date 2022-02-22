import {
  LocalStorageKeys,
  ILocalStorageAppData,
  dataKey,
} from '../types';

export const initializedLocalStorageData = (key: LocalStorageKeys, initialValues: ILocalStorageAppData): void => {
  const data = localStorage.getItem(key);

  if (data) {
    return;
  }

  localStorage.setItem(key, JSON.stringify(initialValues));
};

export const getDataFromLocalStorage = (key: LocalStorageKeys): ILocalStorageAppData => {
  const data = localStorage.getItem(key) as string;

  return JSON.parse(data);
};

export const setDataToLocalStorage = (key: LocalStorageKeys, dataKey: dataKey, value: ILocalStorageAppData[dataKey]): void => {
  const dataFromLocalStorage = getDataFromLocalStorage(LocalStorageKeys.MAIN);
  const newLocalStorageData = { ...dataFromLocalStorage, [dataKey]: value };

  localStorage.setItem(key, JSON.stringify(newLocalStorageData));
};
