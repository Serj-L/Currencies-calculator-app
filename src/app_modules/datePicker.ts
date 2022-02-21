import { dateToStringConverter } from '../utils';

export const setDatePickerParams = (datePickerElement: HTMLElement, date: Date, minDate?: Date, maxDate?: Date): void => {
  if (!datePickerElement) {
    return;
  }

  datePickerElement.setAttribute('value', dateToStringConverter(date));

  if (minDate) {
    datePickerElement.setAttribute('min', dateToStringConverter(minDate));
  }

  if (maxDate) {
    datePickerElement.setAttribute('max', dateToStringConverter(maxDate));
  }
};
