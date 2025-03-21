<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Image extends Model
{
    use HasFactory;
    protected $table = 'section_gambar';
    public $timestamps = false;
    protected $fillable = [
        'id',
        'id_section',
        'gambar'
    ];
}
