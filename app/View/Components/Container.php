<?php

declare(strict_types=1);

namespace App\View\Components;

use Illuminate\View\Component;
use Illuminate\View\View;

final class Container extends Component
{
    /**
     * Width class.
     *
     * @var string
     */
    public $width;

    /**
     * Create a new component instance.
     */
    public function __construct(string $width = 'flexible')
    {
        $this->createWidthClass($width);
    }

    /**
     * Get the view / contents that represent the component.
     */
    public function render(): View
    {
        return view('components.container');
    }

    /**
     * Create a class with width value.
     */
    private function createWidthClass(string $width): void
    {
        $this->width = match ($width) {
            'sm' => 'max-w-screen-sm',
            'md' => 'max-w-screen-md',
            'lg' => 'max-w-screen-lg',
            'xl' => 'max-w-screen-xl',
            '2xl' => 'max-w-screen-2xl',
            'flexible' => 'max-w-screen-lg 2xl:max-w-screen-xl',
            default => null,
        };
    }
}
