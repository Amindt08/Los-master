<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Section extends Model
{
    use HasFactory;
    protected $table = 'section_landing';
    public $timestamps = false;
    protected $fillable = [
        'id',
        'section',
        'judul',
        'deskripsi',
        'id_gambar',
        'kontak'
    ];
}
