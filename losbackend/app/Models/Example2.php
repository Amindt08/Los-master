<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Example2 extends Model
{
    use HasFactory;

    protected $table = 'navbar_submenus'; // Sesuaikan dengan nama tabel
    protected $fillable = ['kode_navbar', 'nama', 'link_to'];

    public function navbar()
    {
        return $this->belongsTo(Navbar::class, 'kode_navbar', 'kode_navbar');
    }
}
