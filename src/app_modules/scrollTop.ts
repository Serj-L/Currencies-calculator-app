const scrollTop = document.getElementById('scroll-top');
const scrollTopButton = document.getElementById('scroll-top-button');

export const scrollTopActivate = (triggerTopOffSet: number): void => {
  if (!scrollTop || !scrollTopButton) {
    return;
  }

  window.addEventListener('scroll', () => {
    if (document.documentElement.scrollTop > triggerTopOffSet) {
      if (!scrollTop.classList.contains('scroll-top--active')) {
        scrollTop.classList.add('scroll-top--active');
      }
    } else {
      if (scrollTop.classList.contains('scroll-top--active')) {
        scrollTop.classList.remove('scroll-top--active');
      }
    }
  });

  scrollTopButton.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });

};
