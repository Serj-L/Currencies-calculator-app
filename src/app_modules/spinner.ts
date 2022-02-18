const spinner = document.querySelector('.spinner');

export const setSpinnerActive = (isActive: boolean): void => {
  if (!spinner) {
    return;
  }
  if (isActive) {
    spinner.classList.add('spinner--active');
  } else {
    spinner.classList.remove('spinner--active');
  }
};
