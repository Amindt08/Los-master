<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RefProvinsi extends Model
{
    use HasFactory;
    protected $table = 'ref_provinsi';
    public $timestamps = false;
    protected $fillable = [
        'id',
        'Kode',
        'Keterangan',
        'negara_id'
    ];
}
