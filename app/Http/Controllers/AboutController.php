<?php

declare(strict_types=1);

namespace App\Http\Controllers;

final class AboutController extends Controller
{
    /**
     * Display the about page.
     */
    public function index(): \Illuminate\View\View
    {
        return view('about.index');
    }
}
