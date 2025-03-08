import './bootstrap';

// Appearance Mode Controller
// This controller is used to manage the appearance mode of the application.
// The appearance mode can be set to 'light', 'dark', or 'system'.
Alpine.data('appearanceModeController', () => ({
    appearanceModeStatus: localStorage.getItem('appearance.mode') || 'system',

    applyAppearanceMode(mode) {
        this.appearanceModeStatus = mode;

        window.appearanceManager.applyAppearanceMode(mode);
    },
}));

// HTML: autofocus
// Fix for autofocus not focusing on the element when navigating to a new page.
document.addEventListener('livewire:navigated', () => {
    const elements = document.querySelectorAll('[autofocus]');

    elements.forEach(element => {
        if (!element.disabled && element.offsetParent !== null) {
            element.focus();
            return false;
        }
    });
});

// HTML: wire:navigate
// Fix for wire:navigate not focusing on the element when clicked.
// Add the attribute wire:navigate-focusable to the element that should be focused.
document.addEventListener('livewire:navigated', () => {
    const elements = document.querySelectorAll('[wire\\:navigate-focusable]');

    elements.forEach(element => {
        element.addEventListener('mousedown', () => {
            element.focus();
        });
    });
});
