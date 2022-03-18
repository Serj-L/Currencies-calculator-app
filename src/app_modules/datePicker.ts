import { dateToStringConverter } from '../utils';

interface IDatePickerParams {
  datePickerElement: HTMLElement | null,
  date: Date,
  minDate?: Date,
  maxDate?: Date,
}

export const setDatePickerParams = ({
  datePickerElement,
  date,
  minDate,
  maxDate,
}: IDatePickerParams): void => {
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
