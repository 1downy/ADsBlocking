const themeToggle = document.getElementById("theme-toggle");
const html = document.documentElement;

// Check for saved theme preference or default to 'light'
const currentTheme = localStorage.getItem("theme") || "light";
html.setAttribute("data-theme", currentTheme);

let themeTimeout;
themeToggle.addEventListener("click", () => {
	if (themeTimeout) return;

	const currentTheme = html.getAttribute("data-theme");
	const newTheme = currentTheme === "light" ? "dark" : "light";

	// Use RAF for smoother transition
	requestAnimationFrame(() => {
		html.setAttribute("data-theme", newTheme);
		localStorage.setItem("theme", newTheme);
	});

	// Prevent rapid toggling
	themeTimeout = setTimeout(() => {
		themeTimeout = null;
	}, 300);
});

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
