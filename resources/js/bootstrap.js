import axios from 'axios';

window.axios = axios;
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

Alpine.data('themeModeController', () => ({
    themeModeStatus: localStorage.getItem('themeModePreference') || 'system',
    themeModePreference: window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light',

    setThemeModePreference(themeMode) {
        this.themeModeStatus = themeMode;

        if (themeMode === 'system') {
            localStorage.removeItem('themeModePreference');

            document.documentElement.classList.toggle('dark', this.themeModePreference === 'dark');
            document.documentElement.setAttribute('color-mode', this.themeModePreference);
        } else {
            localStorage.setItem('themeModePreference', themeMode);

            document.documentElement.classList.toggle('dark', themeMode === 'dark');
            document.documentElement.setAttribute('color-mode', themeMode);
        }
    },

    init() {
        if (this.themeModeStatus === 'system') {
            document.documentElement.setAttribute('color-mode', this.themeModePreference);
        } else {
            document.documentElement.setAttribute('color-mode', this.themeModeStatus);
        }
    },
}));

Alpine.start();
