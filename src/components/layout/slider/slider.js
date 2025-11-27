
import Swiper from 'swiper';
import { Navigation, Pagination, EffectFade, Autoplay } from 'swiper/modules';
/*
Основні модулі слайдера:
Navigation, Pagination, Autoplay, 
EffectFade, Lazy, Manipulation
Детальніше дивись https://swiperjs.com/
*/

// Стилі Swiper
// Підключення базових стилів
import "./slider.scss";
// Повний набір стилів з node_modules
// import 'swiper/css/bundle';

// Ініціалізація слайдерів
function initSliders() {
	if (document.querySelector('.slider-hero')) {

		const heroGradients = document.querySelectorAll('.bg-hero__gradient');
		const hasGradients = heroGradients.length > 0;

		new Swiper('.slider-hero', {
			modules: [Navigation, Pagination, EffectFade, Autoplay],
			observer: true,
			observeParents: true,
			slidesPerView: 1,
			spaceBetween: 0,
			speed: 300,
			loop: true,
			effect: 'fade',
			fadeEffect: { crossFade: true },
			autoplay: {
				delay: 3000,
				disableOnInteraction: false,
			},

			pagination: {
				el: '.slider-hero .swiper-pagination',
				clickable: true,
			},
			navigation: {
				prevEl: '.slider-hero .swiper-button-prev',
				nextEl: '.slider-hero .swiper-button-next',
			},

			on: {
				init(swiper) {
					if (!hasGradients) return;
					updateGradients(swiper, heroGradients);
				},
				slideChange(swiper) {
					if (!hasGradients) return;
					updateGradients(swiper, heroGradients);
				}
			}
		});

		// Функция обновления классов
		function updateGradients(swiper, gradients) {
			const realIndex = swiper.realIndex; // всегда 0–3 при loop!
			gradients.forEach((g, i) => {
				g.classList.toggle('--active', i === realIndex);
			});
		}
	}
	if (document.querySelector('.slider-video')) {
		new Swiper('.slider-video', {
			modules: [Navigation, Pagination],
			observer: true,
			observeParents: true,
			slidesPerView: 1.3,
			spaceBetween: 0,
			speed: 300,
			loop: true,
			allowTouchMove: false,

			pagination: {
				el: '.slider-video .swiper-pagination',
				clickable: true,
			},
			navigation: {
				prevEl: '.slider-video .swiper-button-prev',
				nextEl: '.slider-video .swiper-button-next',
			},

			breakpoints: {
				320: {
					slidesPerView: 1.1,
					spaceBetween: 20,
				},
				768: {
					slidesPerView: 2.2,
					spaceBetween: 20,
				},
				992: {
					slidesPerView: 1.7,
					spaceBetween: 30,
				},
			},

			on: {
			
			}
		});
	}
	// if (document.querySelector('.swiper')) { // <- Вказуємо склас потрібного слайдера
	// 	// Створюємо слайдер
	// 	new Swiper('.swiper', { // <- Вказуємо склас потрібного слайдера
	// 		// Підключаємо модулі слайдера
	// 		// для конкретного випадку
	// 		modules: [Navigation],
	// 		observer: true,
	// 		observeParents: true,
	// 		slidesPerView: 1,
	// 		spaceBetween: 0,
	// 		//autoHeight: true,
	// 		speed: 800,

	// 		//touchRatio: 0,
	// 		//simulateTouch: false,
	// 		//loop: true,
	// 		//preloadImages: false,
	// 		//lazy: true,

	// 		/*
	// 		// Ефекти
	// 		effect: 'fade',
	// 		autoplay: {
	// 			delay: 3000,
	// 			disableOnInteraction: false,
	// 		},
	// 		*/

	// 		// Пагінація
	// 		/*
	// 		pagination: {
	// 			el: '.swiper-pagination',
	// 			clickable: true,
	// 		},
	// 		*/

	// 		// Скроллбар
	// 		/*
	// 		scrollbar: {
	// 			el: '.swiper-scrollbar',
	// 			draggable: true,
	// 		},
	// 		*/

	// 		// Кнопки "вліво/вправо"
	// 		navigation: {
	// 			prevEl: '.swiper-button-prev',
	// 			nextEl: '.swiper-button-next',
	// 		},
	// 		/*
	// 		// Брейкпоінти
	// 		breakpoints: {
	// 			640: {
	// 				slidesPerView: 1,
	// 				spaceBetween: 0,
	// 				autoHeight: true,
	// 			},
	// 			768: {
	// 				slidesPerView: 2,
	// 				spaceBetween: 20,
	// 			},
	// 			992: {
	// 				slidesPerView: 3,
	// 				spaceBetween: 20,
	// 			},
	// 			1268: {
	// 				slidesPerView: 4,
	// 				spaceBetween: 30,
	// 			},
	// 		},
	// 		*/
	// 		// Події
	// 		on: {

	// 		}
	// 	});
	// }
}
document.querySelector('[data-fls-slider]') ?
	window.addEventListener("load", initSliders) : null