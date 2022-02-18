const snackBar = document.querySelector('.snack-bar');
const snackBarMessageContainer = document.querySelector('.snack-bar__text');

export const snackBarHandler = (message: string, displayDuration: number): void => {
  if (!snackBar || !snackBarMessageContainer) {
    return;
  }
  snackBarMessageContainer.textContent = message;
  snackBar.classList.add('snack-bar--active');

  setTimeout(() => {
    snackBar.classList.remove('snack-bar--active');
  }, displayDuration);
};
