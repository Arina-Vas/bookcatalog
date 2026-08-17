import lightIcon from './assets/light.svg'
import darkIcon from './assets/dark.svg'

const DEFAULT_THEME = 'light';
const LIGHT_MODE = 'Light mode'
const DARK_MODE = 'Dark mode'

const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.querySelector('.themeIcon');
const themeTitle = document.querySelector('.themeTitle');

const savedTheme = localStorage.getItem('theme') ?? DEFAULT_THEME;
document.documentElement.dataset.theme = savedTheme;
updateThemeToggleButton(savedTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.dataset.theme;
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    document.documentElement.dataset.theme = newTheme;
    localStorage.setItem('theme', newTheme);

    updateThemeToggleButton(newTheme);
});

function updateThemeToggleButton(theme) {
    const isDark = theme === 'dark';

    themeTitle.textContent = isDark ? LIGHT_MODE : DARK_MODE;
    themeIcon.src = isDark ? lightIcon : darkIcon;
}
