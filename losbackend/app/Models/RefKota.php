<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RefKota extends Model
{
    use HasFactory;
    protected $table = 'ref_kota';
    public $timestamps = false;
    protected $fillable = [
        'id',
        'Kode',
        'Keterangan',
        'provinsi_id'
    ];
}
