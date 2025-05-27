<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Planta extends Model
{
    protected $fillable = [
        'nombre',
        'imagen',
        'descripcion',
        'florea',
        'epoca',
        'origen',
        'agua',
        'sol',
        'temperatura',
        'tipo',
    ];

    public $timestamps = true;
}
