import {
  LocalStorageKeys,
  ThemeTypes,
  ThemeElementAttribute,
} from '../types';
import {
  getDataFromLocalStorage,
  setDataToLocalStorage,
} from '../api/localStorage';

export const getCurrentThemeType = (): ThemeTypes => {
  const dataFromLocalStorage = getDataFromLocalStorage(LocalStorageKeys.MAIN);

  return dataFromLocalStorage.themeType;
};

export const setInitialThemeTypeOnElement = (element: Element | null): void => {
  if (!element) {
    return;
  }

  const currentThemeType = getCurrentThemeType();

  if (element.getAttribute(ThemeElementAttribute.NAME) === currentThemeType) {
    return;
  }

  document.body.setAttribute(ThemeElementAttribute.NAME, currentThemeType);
};

export const changeThemeType = (currentThemeType: ThemeTypes, element: HTMLElement): void => {
  const newThemeType = currentThemeType === ThemeTypes.LIGHT ? ThemeTypes.DARK : ThemeTypes.LIGHT;
  const dataFromLocalStorage = getDataFromLocalStorage(LocalStorageKeys.MAIN);
  const newLocalStorageData = { ...dataFromLocalStorage, themeType: newThemeType };

  element.setAttribute(ThemeElementAttribute.NAME, newThemeType);
  setDataToLocalStorage(LocalStorageKeys.MAIN, newLocalStorageData);
};
