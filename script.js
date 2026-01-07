const themeToggle = document.getElementById("theme-toggle");
const html = document.documentElement;

const STORAGE_KEY = "theme";
const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)");

// Let's keep the theme consistent with the user's OS unless they tell us otherwise
systemPrefersDark.addEventListener("change", (e) => {
	if (!localStorage.getItem(STORAGE_KEY)) {
		document.documentElement.setAttribute("data-theme", e.matches ? "dark" : "light");
	}
});

if (themeToggle) {
	let themeTimeout = null;

	themeToggle.addEventListener("click", () => {
		if (themeTimeout) return;

		const currentTheme = html.getAttribute("data-theme");
		const newTheme = currentTheme === "dark" ? "light" : "dark";

		html.setAttribute("data-theme", newTheme);
		localStorage.setItem(STORAGE_KEY, newTheme);

		themeTimeout = setTimeout(() => {
			themeTimeout = null;
		}, 300);
	});
}

const body = document.body;

body.addEventListener("click", (e) => {
	const anchor = e.target.closest('a[href^="#"]');
	if (!anchor) return;

	e.preventDefault();
	const targetId = anchor.getAttribute("href");
	const target = document.querySelector(targetId);

	if (target) {
		requestAnimationFrame(() => {
			target.scrollIntoView({
				behavior: "smooth",
				block: "start",
			});
		});
	}
});

const backToTopButton = document.querySelector("#back-to-top");

let ticking = false;
window.addEventListener(
	"scroll",
	() => {
		if (!ticking) {
			window.requestAnimationFrame(() => {
				if (window.pageYOffset > 300) {
					backToTopButton?.classList.add("show");
				} else {
					backToTopButton?.classList.remove("show");
				}

				ticking = false;
			});
			ticking = true;
		}
	},
	{ passive: true }
);

if (backToTopButton) {
	backToTopButton.addEventListener("click", () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	});
}
