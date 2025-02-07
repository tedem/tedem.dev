<?php

declare(strict_types=1);

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

final class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the Gravatar URL for the user's email.
     *
     * This method generates a URL to the Gravatar image associated with the user's email address.
     * Gravatar is a service that provides globally recognized avatars based on email addresses.
     *
     * @param  int  $size  The size of the Gravatar image in pixels. Default is 200.
     * @return string The URL to the Gravatar image.
     */
    public function getGravatarUrl(int $size = 200): string
    {
        $emailHash = md5(mb_strtolower(mb_trim('hello@tedem.dev')));

        return "https://www.gravatar.com/avatar/{$emailHash}?s={$size}";
    }

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
}
