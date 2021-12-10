// Плавна прокрутка

const anchors = document.querySelectorAll('a[href*="#"]');

for (let anchor of anchors) {
	anchor.addEventListener("click", function (e) {
		e.preventDefault();

		const blockID = anchor.getAttribute("href").substr(1);

		document.getElementById(blockID).scrollIntoView({
			behavior: "smooth",
			block: "start",
		});
	});
}

// Фон для header при скроллі

window.addEventListener("scroll", () => {
	let scrollTop = window.pageYOffset;
	let headerWrapper = document.querySelector(".header");

	if (scrollTop >= 100) {
		headerWrapper.classList.add("bg-header");
	} else {
		headerWrapper.classList.remove("bg-header");
	}
});

//Modal - auth

const modalAuth = document.querySelector(".modal-auth");
const formAuth = document.querySelector(".form-auth");

document.querySelector(".header__login").addEventListener("click", () => {
	modalAuth.classList.add("modal-auth-active");
});

modalAuth.addEventListener("click", function () {
	modalAuth.classList.remove("modal-auth-active");
});

formAuth.addEventListener("click", function (e) {
	e.stopPropagation();
});

// Alert

const alertInfo = () => {
	const alertDiv = document.querySelector(".alert-info");
	const closeButton = document.querySelector("#close-alert");

	setTimeout(() => {
		alertDiv.classList.add("alert-info-active");
	}, 1500);

	closeButton.addEventListener("click", function () {
		alertDiv.classList.remove("alert-info-active");
	});

	setTimeout(() => {
		alertDiv.classList.remove("alert-info-active");
	}, 7000);
};

alertInfo();

//SliderV1

// function sliderV1() {
// 	const sliderItems = document.querySelector(".slider__items");
// 	const controlItem = document.querySelectorAll(".control__item");

// 	let offset = 0;
// 	function switchSlider(offset) {
// 		switch (offset) {
// 			case 0:
// 				controlItem[0].classList.add("control__item-active");
// 				controlItem[1].classList.remove("control__item-active");
// 				controlItem[2].classList.remove("control__item-active");
// 				break;
// 			case -100:
// 				controlItem[0].classList.remove("control__item-active");
// 				controlItem[1].classList.add("control__item-active");
// 				controlItem[2].classList.remove("control__item-active");
// 				break;
// 			case -200:
// 				controlItem[0].classList.remove("control__item-active");
// 				controlItem[1].classList.remove("control__item-active");
// 				controlItem[2].classList.add("control__item-active");
// 				break;

// 			default:
// 				break;
// 		}
// 	}
// 	let sliderInterval = setInterval(() => {
// 		offset = offset - 100;
// 		if (offset < -200) {
// 			offset = 0;
// 		}
// 		sliderItems.style.left = offset + "%";

// 		//control-items
// 		switchSlider(offset);
// 	}, 4000);

// 	controlItem[0].addEventListener("click", () => {
// 		offset = 0;
// 		sliderItems.style.left = offset + "%";
// 		switchSlider(offset);
// 	});
// 	controlItem[1].addEventListener("click", () => {
// 		offset = -100;
// 		sliderItems.style.left = offset + "%";
// 		switchSlider(offset);
// 	});
// 	controlItem[2].addEventListener("click", () => {
// 		offset = -200;
// 		sliderItems.style.left = offset + "%";
// 		switchSlider(offset);
// 	});
// }

// sliderV1();

//SliderV2

const sliderV2 = () => {
	let slideIndex = 1;
	const controlItem = document.querySelectorAll(".control__item");

	function showSlide(n) {
		let slides = document.getElementsByClassName("item");

		if (n > slides.length) {
			slideIndex = 1;
		}
		if (n < 1) {
			slideIndex = slides.length;
		}

		for (let slide of slides) {
			slide.style.display = "none";
		}

		slides[slideIndex - 1].style.display = "flex";

		controlItem.forEach((item, index) => {
			item.addEventListener("click", () => {
				slideIndex = index + 1;
				showSlide(slideIndex);
				switchSlider(slideIndex);
			});
		});

		// controlItem[0].addEventListener("click", () => {
		// 	slideIndex = 1;
		// 	showSlide(slideIndex);
		// 	switchSlider(slideIndex);
		// 	clearInterval
		// });
		// controlItem[1].addEventListener("click", () => {
		// 	slideIndex = 2;
		// 	showSlide(slideIndex);
		// 	switchSlider(slideIndex);
		// });
		// controlItem[2].addEventListener("click", () => {
		// 	slideIndex = 3;
		// 	showSlide(slideIndex);
		// 	switchSlider(slideIndex);
		// });
	}

	function switchSlider(slideIndex) {
		switch (slideIndex) {
			case 1:
				controlItem[0].classList.add("control__item-active");
				controlItem[1].classList.remove("control__item-active");
				controlItem[2].classList.remove("control__item-active");
				break;
			case 2:
				controlItem[0].classList.remove("control__item-active");
				controlItem[1].classList.add("control__item-active");
				controlItem[2].classList.remove("control__item-active");
				break;
			case 3:
				controlItem[0].classList.remove("control__item-active");
				controlItem[1].classList.remove("control__item-active");
				controlItem[2].classList.add("control__item-active");
				break;

			default:
				break;
		}
	}

	const slideInterval = setInterval(() => {
		showSlide((slideIndex += 1));
		switchSlider(slideIndex);
	}, 3500);

	showSlide(slideIndex);
};

sliderV2();
