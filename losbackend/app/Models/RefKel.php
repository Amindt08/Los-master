<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RefKel extends Model
{
    use HasFactory;
    protected $table = 'ref_kel';
    public $timestamps = false;
    protected $fillable = [
        'id',
        'Kode',
        'Keterangan',
        'kecamatan_id'
    ];
}
