<script>
    (function() {
        window.app = {
            applyAppearanceMode(mode) {
                const applyDark = () => document.documentElement.classList.add('dark');
                const applyLight = () => document.documentElement.classList.remove('dark');
                const systemPreference = window.matchMedia('(prefers-color-scheme: dark)');

                if (mode === 'system') {
                    window.localStorage.removeItem('appearance.mode');
                    systemPreference.matches ? applyDark() : applyLight();
                    this.setColorModeAttribute(systemPreference.matches ? 'dark' : 'light');
                } else if (mode === 'dark') {
                    window.localStorage.setItem('appearance.mode', 'dark');
                    applyDark();
                    this.setColorModeAttribute('dark');
                } else if (mode === 'light') {
                    window.localStorage.setItem('appearance.mode', 'light');
                    applyLight();
                    this.setColorModeAttribute('light');
                }
            },

            setColorModeAttribute(mode) {
                document.documentElement.setAttribute('color-mode', mode);
            },

            getPreferredAppearanceMode() {
                return window.localStorage.getItem('appearance.mode') || 'system';
            },
        };

        window.app.applyAppearanceMode(window.app.getPreferredAppearanceMode());

        document.addEventListener('livewire:navigated', () => {
            window.app.applyAppearanceMode(window.app.getPreferredAppearanceMode());
        });
    })();
</script>

@livewireStyles

@vite(['resources/css/app.css', 'resources/js/app.js'])
