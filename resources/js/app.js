import './bootstrap';

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
