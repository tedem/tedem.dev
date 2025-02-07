<?php

declare(strict_types=1);

namespace App\Http\Controllers;

final class ContactController extends Controller
{
    /**
     * Display the contact page.
     */
    public function index(): \Illuminate\View\View
    {
        return view('contact');
    }
}
