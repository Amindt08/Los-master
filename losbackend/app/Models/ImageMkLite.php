<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ImageMkLite extends Model
{
    use HasFactory;
    protected $table = 'mk_lite_image';
    public $timestamps = false;
    protected $fillable = [
        'id',
        'Kode',
        'image'
    ];
}
