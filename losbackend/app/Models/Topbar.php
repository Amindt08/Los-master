<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Topbar extends Model
{
    use HasFactory;
    protected $table = 'menu_topbar';
    public $timestamps = false;
    protected $fillable = [
        'id',
        'Kode',
        'label',
    ];
}