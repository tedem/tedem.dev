<script>
(function() {
    const appearanceManager = {
        appearanceModeKey: 'appearance.mode',

        applyAppearanceMode(mode) {
            const applyDarkMode = () => document.documentElement.classList.add('dark');
            const applyLightMode = () => document.documentElement.classList.remove('dark');
            const systemPreference = window.matchMedia('(prefers-color-scheme: dark)');

            switch (mode) {
                case 'system':
                    this.resetAppearanceMode();
                    systemPreference.matches ? applyDarkMode() : applyLightMode();
                    this.setColorModeAttribute(systemPreference.matches ? 'dark' : 'light');
                    break;

                case 'dark':
                    this.setAppearanceMode('dark');
                    applyDarkMode();
                    this.setColorModeAttribute('dark');
                    break;

                case 'light':
                    this.setAppearanceMode('light');
                    applyLightMode();
                    this.setColorModeAttribute('light');
                    break;

                default:
                    this.resetAppearanceMode();
                    break;
            }
        },

        getPreferredAppearanceMode() {
            return window.localStorage.getItem(this.appearanceModeKey) || 'system';
        },

        setAppearanceMode(mode) {
            window.localStorage.setItem(this.appearanceModeKey, mode);
        },

        resetAppearanceMode() {
            window.localStorage.removeItem(this.appearanceModeKey);
        },

        setColorModeAttribute(mode) {
            document.documentElement.setAttribute('color-mode', mode);
        },
    };

    appearanceManager.applyAppearanceMode(appearanceManager.getPreferredAppearanceMode());

    document.addEventListener('livewire:navigated', () => {
        appearanceManager.applyAppearanceMode(appearanceManager.getPreferredAppearanceMode());
    });

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
        if (appearanceManager.getPreferredAppearanceMode() === 'system') {
            appearanceManager.applyAppearanceMode('system');
        }
    });

    window.appearanceManager = appearanceManager;
})();
</script>
