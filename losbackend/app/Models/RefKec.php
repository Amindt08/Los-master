<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RefKec extends Model
{
    use HasFactory;
    protected $table = 'ref_kec';
    public $timestamps = false;
    protected $fillable = [
        'id',
        'Kode',
        'Keterangan',
        'kota_id'
    ];
}
