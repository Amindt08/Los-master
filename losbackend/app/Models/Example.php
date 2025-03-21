<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Example extends Model
{
    use HasFactory;

    protected $table = 'navbars'; // Sesuaikan dengan nama tabel
    protected $fillable = ['kode_navbar', 'nama', 'link_to'];

    public function submenus()
    {
        return $this->hasMany(Example2::class, 'kode_navbar', 'kode_navbar');
    }
}
