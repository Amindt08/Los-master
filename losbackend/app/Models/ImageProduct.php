<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ImageProduct extends Model
{
    use HasFactory;
    protected $table = 'product_image';
    public $timestamps = false;
    protected $fillable = [
        'id',
        'Kode',
        'image'
    ];
}
