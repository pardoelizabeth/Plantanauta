<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class UserPlanta extends Model
{
    protected $table = 'user_plantas';

    protected $fillable = [
        'user_id',
        'nombre',
        'imagen',
        'planta_id',
        'frecuencia_riego',
        'recordatorios_activados',
        'correo_recordatorio',
    ];


    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function planta(): BelongsTo
    {
        return $this->belongsTo(Planta::class);
    }

}
