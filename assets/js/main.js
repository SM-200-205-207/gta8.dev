(function () {
  const root = document.documentElement;
  const storageKey = "theme";

  function getSavedTheme() {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved === "dark" || saved === "light") return saved;
    } catch (e) {}
    return null;
  }

  function saveTheme(theme) {
    try {
      localStorage.setItem(storageKey, theme);
    } catch (e) {}
  }

  function getPreferredTheme() {
    const saved = getSavedTheme();
    if (saved) return saved;
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
  }

  applyTheme(getPreferredTheme());

  document.addEventListener("DOMContentLoaded", function () {
    const themeToggle = document.querySelector(".theme-toggle");
    if (themeToggle) {
      themeToggle.addEventListener("click", function () {
        const current = root.getAttribute("data-theme") || getPreferredTheme();
        const next = current === "dark" ? "light" : "dark";
        applyTheme(next);
        saveTheme(next);
      });
    }

    const menuTrigger = document.querySelector(".menu-trigger");
    const menu = document.querySelector(".menu");
    if (menuTrigger && menu) {
      function setMenuOpen(open) {
        menu.classList.toggle("is-open", open);
        menuTrigger.setAttribute("aria-expanded", String(open));
      }

      menuTrigger.addEventListener("click", function (e) {
        e.stopPropagation();
        setMenuOpen(!menu.classList.contains("is-open"));
      });

      document.addEventListener("click", function (e) {
        if (menu.classList.contains("is-open") && !menu.contains(e.target)) {
          setMenuOpen(false);
        }
      });

      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && menu.classList.contains("is-open")) {
          setMenuOpen(false);
        }
      });
    }
  });
})();
