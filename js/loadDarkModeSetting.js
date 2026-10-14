(function() {
    const savedDarkModeSetting = localStorage.getItem('darkMode');
    
    const prefersSystemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedDarkModeSetting === 'enabled' || (!savedDarkModeSetting && prefersSystemDark)) {
        document.documentElement.classList.add('dark-mode');
    } else {
        document.documentElement.classList.remove('dark-mode');
    }
})();