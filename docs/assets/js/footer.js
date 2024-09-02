// Function to set theme and save to local storage
function setTheme(theme) {
    document.documentElement.className = theme;
    localStorage.setItem('theme', theme);
}

function toggleDarkMode() {
    darkMode = !darkMode;
    updateIcons();
    setTheme(darkMode ? 'dark-theme' : 'light-theme');
}

function updateIcons() {
    const lightIcon = document.getElementById('light-icon');
    const darkIcon = document.getElementById('dark-icon');
    lightIcon.style.display = darkMode ? 'none' : 'block';
    darkIcon.style.display = darkMode ? 'block' : 'none';
}

// Initialize theme and icon visibility based on local storage
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme');
    darkMode = savedTheme === 'dark-theme';
    document.documentElement.className = darkMode ? 'dark-theme' : 'light-theme';
    updateIcons();
}

window.addEventListener('DOMContentLoaded', initializeTheme);
