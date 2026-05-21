// Theme management
const THEME_KEY = 'ramreserve_theme';

function getCurrentTheme() {
    return localStorage.getItem(THEME_KEY) || 'light';
}

function setTheme(theme) {
    localStorage.setItem(THEME_KEY, theme);
    applyTheme(theme);
}

function applyTheme(theme) {
    if (theme === 'dark') {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
}

// Apply theme on page load
document.addEventListener('DOMContentLoaded', () => {
    applyTheme(getCurrentTheme());
});