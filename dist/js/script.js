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
};

alertInfo();
