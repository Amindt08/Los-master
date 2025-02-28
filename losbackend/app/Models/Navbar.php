<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Navbar extends Model
{
    use HasFactory;
    protected $table = 'menu_navbar';
    public $timestamps = false;
    protected $fillable = [
        'navbar_id',
        'Kode',
        'label',
    ];
}