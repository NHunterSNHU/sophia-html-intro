const darkModeToggle = document.getElementById('dark-light-mode');

if (document.documentElement.classList.contains('dark-mode')) {
    darkModeToggle.textContent = 'Light Mode';
} else {
    darkModeToggle.textContent = 'Dark Mode';
}

function toggleDarkMode() {
    document.documentElement.classList.toggle('dark-mode');
    
    if (document.documentElement.classList.contains('dark-mode')) {
        localStorage.setItem('darkMode', 'enabled');
        darkModeToggle.textContent = 'Light Mode';
    } else {
        localStorage.setItem('darkMode', 'disabled');
        darkModeToggle.textContent = 'Dark Mode';
    }
}

darkModeToggle.addEventListener('click', toggleDarkMode);