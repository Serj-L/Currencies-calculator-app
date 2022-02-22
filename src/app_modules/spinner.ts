const spinner = document.getElementById('spinner');

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
