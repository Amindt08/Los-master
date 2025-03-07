<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Title extends Model
{
    use HasFactory;
    protected $table = 'judul';
    public $timestamps = false;
    protected $fillable = [
        'id',
        'Kode',
        'Keterangan',
    ];
}
