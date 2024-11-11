import Swiper from 'swiper';

export const swiperСontrol = () => {
  const swiper = new Swiper('.swiper', {
    loop: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    effect: 'fade',
    speed: 1000,
  });
  document.getElementById('prev-slide').addEventListener('click', () => {
    swiper.slidePrev();
  });

  document.getElementById('next-slide').addEventListener('click', () => {
    swiper.slideNext();
  });
};
