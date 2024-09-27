<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Models\Notes;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    public function coding(): HasMany
    {
        return $this->hasMany(Coding::class);
    }
    public function health(): HasMany
    {
        return $this->hasMany(Health::class);
    }
    public function career(): HasMany
    {
        return $this->hasMany(Career::class);
    }
    public function work(): HasMany
    {
        return $this->hasMany(Work::class);
    }
    public function home(): HasMany
    {
        return $this->hasMany(Home::class);
    }
    public function mood(): HasMany
    {
        return $this->hasMany(Mood::class);
    }
    public function notes(): HasMany
    {
        return $this->hasMany(Notes::class);
    }
    public function note_titles(): HasMany
    {
        return $this->hasMany(Note_titles::class);
    }
}
