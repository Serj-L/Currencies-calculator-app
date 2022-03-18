import { setDataToLocalStorage } from '../api/localStorage';

import { LocalStorageKeys } from '../types';

import { renderCurrencySelectOptionsList } from '../app_modules';

import {
  throttle,
  scrollLockUnlock,
} from '../utils';

interface IDragNdropHandler {
  evt: MouseEvent | TouchEvent,
  currenciesListElement: HTMLElement,
  userCurrenciesList: string[],
  baseCurrencyAbbreviation: string,
  baseCurrencySelectElement: HTMLSelectElement | null,
}

export const dragNdropHandler = ({
  evt,
  currenciesListElement,
  userCurrenciesList,
  baseCurrencyAbbreviation,
  baseCurrencySelectElement,
}: IDragNdropHandler): void => {
  let event,
    target,
    clientX,
    clientY,
    pageX,
    pageY;
  // define event type (mouse or touch event)
  if (/touch/.test(evt.type)) {
    event = evt as TouchEvent;
    target = event.targetTouches[0].target as HTMLElement;
    if (!target.hasAttribute('data-drag-n-drop-anchor')) {
      return;
    }

    clientX = event.changedTouches[0].clientX;
    clientY = event.changedTouches[0].clientY;
    pageX = event.changedTouches[0].pageX;
    pageY = event.changedTouches[0].pageY;
    scrollLockUnlock('lock', true);
  } else {
    event = evt as MouseEvent;
    target = event.target as HTMLElement;
    if (!target.hasAttribute('data-drag-n-drop-anchor')) {
      return;
    }

    clientX = event.clientX;
    clientY = event.clientY;
    pageX = event.pageX;
    pageY = event.pageY;
    scrollLockUnlock('lock', false);
  }

  const currencyCard = target.closest('li') as HTMLLIElement;
  const {
    width: currencyCardWidth,
    x: currencyCardX,
    y: currencyCardY,
  } = currencyCard.getBoundingClientRect();
  const dragPointShiftX = clientX - currencyCardX;
  const dragPointShiftY = clientY - currencyCardY;
  const currencyCardClone = currencyCard.cloneNode(true) as HTMLLIElement;
  const dragNdropAnchor = currencyCardClone.querySelector('[data-drag-n-drop-anchor]') as HTMLElement;
  const targetCurrenciesCards = Array.from(document.querySelectorAll('[data-currency-list-item]'));

  // dragging currencyCard handler
  const dragThrottledHandler = throttle((evt: MouseEvent | TouchEvent): void => {
    let event;

    if (/touch/.test(evt.type)) {
      event = evt as TouchEvent;
      pageX = event.changedTouches[0].pageX;
      pageY = event.changedTouches[0].pageY;
    } else {
      event = evt as MouseEvent;
      pageX = event.pageX;
      pageY = event.pageY;
    }

    currencyCardClone.style.setProperty('--top', `${pageY - dragPointShiftY}px`);
    currencyCardClone.style.setProperty('--left', `${pageX - dragPointShiftX}px`);
    const {
      x: currencyCardCloneX,
      y: currencyCardCloneY,
      width: currencyCardCloneWidth,
      height: currencyCardCloneHeight,
    } = currencyCardClone.getBoundingClientRect();

    // define currencyCard element under dragging currencyCardClone element
    currencyCardClone.hidden = true;
    const dropTargetElement = document.elementFromPoint((currencyCardCloneX + currencyCardCloneWidth / 2), (currencyCardCloneY + currencyCardCloneHeight / 2))?.closest('li');
    currencyCardClone.hidden = false;
    // reorder currenciesCards elements
    if (dropTargetElement) {
      const currrentIndex = Number(currencyCardClone.getAttribute('data-order-number'));
      const targetIndex = Number(dropTargetElement.getAttribute('data-order-number'));

      if (targetIndex === currrentIndex) {
        return;
      }
      // defining a new position of the dragged currencyCard in the list of currencies and change the new order of the currencies in userCurrencieslist and HTML
      targetCurrenciesCards.splice(targetIndex, 0, targetCurrenciesCards.splice(currrentIndex, 1)[0]);
      userCurrenciesList.splice(targetIndex, 0, userCurrenciesList.splice(currrentIndex, 1)[0]);
      currencyCardClone.setAttribute('data-order-number', `${targetIndex}`);

      if (currenciesListElement) {
        currenciesListElement.textContent = '';

        targetCurrenciesCards.forEach((currencyCard, index) => {
          currencyCard.setAttribute('data-order-number', `${index}`);
          currenciesListElement.appendChild(currencyCard);
        });
      }
    }
  }, 70);

  // drop currencyCard handler
  const dropHandler = (evt: MouseEvent | TouchEvent): void => {
    currencyCard.removeAttribute('data-dragging');
    document.body.removeChild(currencyCardClone);
    renderCurrencySelectOptionsList({ baseCurrencySelectElement, baseCurrencyAbbreviation, userCurrenciesList });
    setDataToLocalStorage(LocalStorageKeys.MAIN, 'currenciesList', userCurrenciesList);

    if (/touch/.test(evt.type)) {
      document.body.removeEventListener('touchmove', dragThrottledHandler);
      scrollLockUnlock('unlock', true);
    } else {
      document.body.removeEventListener('mousemove', dragThrottledHandler);
      scrollLockUnlock('unlock', false);
    }
  };

  // drag start actions (mousedown or touchstart)
  currencyCard.setAttribute('data-dragging', '');

  document.body.appendChild(currencyCardClone);

  currencyCardClone.style.setProperty('--max-width', `${currencyCardWidth}px`);
  currencyCardClone.style.setProperty('--top', `${pageY - dragPointShiftY}px`);
  currencyCardClone.style.setProperty('--left', `${pageX - dragPointShiftX}px`);
  currencyCardClone.setAttribute('data-dragging-clone', '');
  dragNdropAnchor.style.cursor = 'grabbing';

  if (/touch/.test(evt.type)) {
    document.body.addEventListener('touchmove', dragThrottledHandler);
    currencyCard.addEventListener('touchend', dropHandler, { once: true });
  } else {
    document.body.addEventListener('mousemove', dragThrottledHandler);
    currencyCardClone.addEventListener('mouseup', dropHandler);
  }
};
