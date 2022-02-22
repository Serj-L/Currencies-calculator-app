const snackBar = document.getElementById('snack-bar');
const snackBarMessageContainer = document.getElementById('snack-bar-text');

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
