const themeToggle = document.getElementById("theme-toggle");
const html = document.documentElement;

const STORAGE_KEY = "theme";
const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)");

// Get initial theme
function getInitialTheme() {
	const savedTheme = localStorage.getItem(STORAGE_KEY);
	if (savedTheme === "light" || savedTheme === "dark") {
		return savedTheme;
	}
	return systemPrefersDark.matches ? "dark" : "light";
}

// Apply theme
function applyTheme(theme) {
	html.setAttribute("data-theme", theme);
}

// Initial load
applyTheme(getInitialTheme());

// Listen for OS theme changes (only if no manual override)
systemPrefersDark.addEventListener("change", (e) => {
	if (!localStorage.getItem(STORAGE_KEY)) {
		applyTheme(e.matches ? "dark" : "light");
	}
});

// Manual toggle
if (themeToggle) {
	let themeTimeout = null;

	themeToggle.addEventListener("click", () => {
		if (themeTimeout) return;

		const currentTheme = html.getAttribute("data-theme");
		const newTheme = currentTheme === "dark" ? "light" : "dark";

		applyTheme(newTheme);
		localStorage.setItem(STORAGE_KEY, newTheme);

		themeTimeout = setTimeout(() => {
			themeTimeout = null;
		}, 300);
	});
}

const body = document.body;

// Smooth scroll for anchor links with RAF optimization
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

let ticking = false;
document.addEventListener(
	"scroll",
	() => {
		if (!ticking) {
			requestAnimationFrame(() => {
				// Scroll-based optimizations can be added here
				ticking = false;
			});
			ticking = true;
		}
	},
	{ passive: true }
);
