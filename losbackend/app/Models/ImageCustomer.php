<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ImageCustomer extends Model
{
    use HasFactory;
    protected $table = 'customer_image';
    public $timestamps = false;
    protected $fillable = [
        'id',
        'Kode',
        'image'
    ];
}
