<?php

declare(strict_types=1);

namespace App\Livewire\Auth;

use App\Livewire\Actions\SignOut;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
use Livewire\Attributes\Layout;
use Livewire\Component;

#[Layout('layouts.plain')]
final class VerifyEmail extends Component
{
    public function sendVerification(): void
    {
        if (Auth::user()->hasVerifiedEmail()) {
            $this->redirectIntended(default: route('home', absolute: false), navigate: true);

            return;
        }

        Auth::user()->sendEmailVerificationNotification();

        Session::flash('status', 'verification-link-sent');
    }

    public function signOut(SignOut $signOut): void
    {
        $signOut();

        $this->redirect('/', navigate: true);
    }

    public function render()
    {
        return view('livewire.auth.verify-email');
    }
}
