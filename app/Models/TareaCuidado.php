<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TareaCuidado extends Model
{
    protected $fillable = [
        'nombre',
        'descripcion',
        'frecuencia',
        'materiales',
        'instrucciones',
        'imagen',
    ];

    public $timestamps = true;
}
