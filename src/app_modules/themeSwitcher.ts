import {
  LocalStorageKeys,
  ThemeTypes,
} from '../types';

export const getCurrentThemeType = (): ThemeTypes => {
  return localStorage.getItem(LocalStorageKeys.THEMETYPE) as ThemeTypes || ThemeTypes.LIGHT;
};

export const setInitialThemeTypeOnElement = (element: HTMLElement): void => {
  const currentThemeType = getCurrentThemeType();

  if (element.getAttribute(ThemeTypes.ELEMENTATTR) === currentThemeType) {
    return;
  }

  document.body.setAttribute(ThemeTypes.ELEMENTATTR, currentThemeType);
};

export const changeThemeType = (currentThemeType: ThemeTypes, element: HTMLElement): void => {
  const newThemeType = currentThemeType === ThemeTypes.LIGHT ? ThemeTypes.DARK : ThemeTypes.LIGHT;

  element.setAttribute(ThemeTypes.ELEMENTATTR, newThemeType);
  localStorage.setItem(LocalStorageKeys.THEMETYPE, newThemeType);
};
