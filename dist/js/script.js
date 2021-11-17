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
