<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;


class Notes extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'user_id', 'note', 'date'];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
    public function note_titles(): BelongsTo
    {
        return $this->belongsTo(Note_titles::class);
    }
}
