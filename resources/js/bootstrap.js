import axios from 'axios';

window.axios = axios;
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

Alpine.data('appearanceModeController', () => ({
    appearanceModeStatus: localStorage.getItem('appearance.mode') || 'system',

    applyAppearanceMode(mode) {
        this.appearanceModeStatus = mode;

        window.app.applyAppearanceMode(mode);
    },
}));
