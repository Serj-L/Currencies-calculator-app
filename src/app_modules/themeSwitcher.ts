import {
  LocalStorageKeys,
  ThemeTypes,
} from '../types';

export const getCurrentThemeType = (): ThemeTypes => {
  const savedThemeType = localStorage.getItem(LocalStorageKeys.THEMETYPE) as ThemeTypes;

  if (savedThemeType) {
    return savedThemeType;
  }

  if (window.matchMedia && window.window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return ThemeTypes.DARK;
  }

  return ThemeTypes.LIGHT;
};

export const setInitialThemeTypeOnElement = (element: Element | null): void => {
  if (!element) {
    return;
  }

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
