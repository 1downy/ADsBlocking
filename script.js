// Theme toggle functionality
const themeToggle = document.getElementById("theme-toggle");
const html = document.documentElement;

// Check for saved theme preference or default to 'light'
const currentTheme = localStorage.getItem("theme") || "light";
html.setAttribute("data-theme", currentTheme);

// Toggle theme
themeToggle.addEventListener("click", () => {
	const currentTheme = html.getAttribute("data-theme");
	const newTheme = currentTheme === "light" ? "dark" : "light";

	html.setAttribute("data-theme", newTheme);
	localStorage.setItem("theme", newTheme);
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
	anchor.addEventListener("click", function (e) {
		e.preventDefault();
		const target = document.querySelector(this.getAttribute("href"));
		if (target) {
			target.scrollIntoView({
				behavior: "smooth",
				block: "start",
			});
		}
	});
});
