<?php

declare(strict_types=1);

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

final class User extends Authenticatable
{
    use HasFactory;
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'username',
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
     * This method generates a Gravatar URL based on the user's email address.
     * If the email is not set, it defaults to 'hello@tedem.dev'.
     * The email is hashed using MD5 after being converted to lowercase and trimmed.
     *
     * @param  int  $size  The size of the Gravatar image. Default is 200.
     * @return string The URL of the Gravatar image.
     */
    public function getGravatarUrl(int $size = 200): string
    {
        $emailHash = md5(mb_strtolower(mb_trim($this->email ?? 'hello@tedem.dev')));

        return sprintf('https://www.gravatar.com/avatar/%s?s=%d', $emailHash, $size);
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
