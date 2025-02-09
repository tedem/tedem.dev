<?php

declare(strict_types=1);

namespace App\View\Components;

use Closure;
use Illuminate\Contracts\View\View;
use Illuminate\View\Component;

final class Meta extends Component
{
    /**
     * Create a new component instance.
     */
    public function __construct(
        private readonly string $title = '',
        private readonly string $description = '',
        private readonly string $ogImage = '',
        private readonly string $twitterImage = '',
    ) {}

    /**
     * Get the view / contents that represent the component.
     */
    public function render(): View|Closure|string
    {
        return view('components.meta', [
            'title' => $this->title(),
            'description' => $this->description,
            'author' => $this->author(),
            'date' => $this->date(),
            'language' => $this->language(),
            'ogImage' => $this->ogImage(),
            'twitterImage' => $this->twitterImage(),
        ]);
    }

    private function title(): string
    {
        return $this->title ?? config('app.name');
    }

    private function author(): string
    {
        return 'tedem';
    }

    private function date(): string
    {
        return now()->format('Y-m-d');
    }

    private function language(): string
    {
        return app()->getLocale();
    }

    private function ogImage(): string
    {
        return $this->ogImage === '' ? asset('og-image.jpg') : $this->ogImage;
    }

    private function twitterImage(): string
    {
        return $this->twitterImage === '' ? asset('twitter-image.jpg') : $this->twitterImage;
    }
}
