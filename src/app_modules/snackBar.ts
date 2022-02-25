const snackBar = document.getElementById('snack-bar');
const snackBarMessageContainer = document.getElementById('snack-bar-text');

export const snackBarHandler = (message: string, displayDuration: number): void => {
  if (!snackBar || !snackBarMessageContainer) {
    return;
  }
  snackBarMessageContainer.textContent = message;
  snackBar.classList.add('snack-bar--active');

  const timeoutID = setTimeout(() => {
    snackBar.classList.remove('snack-bar--active');
  }, displayDuration);

  snackBar?.addEventListener('click', () => {
    snackBar.classList.remove('snack-bar--active');
    window.clearTimeout(timeoutID);
  });
};
