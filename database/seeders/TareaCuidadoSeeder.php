<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\TareaCuidado;

class TareaCuidadoSeeder extends Seeder
{
    public function run(): void
    {
        TareaCuidado::create([
            'nombre' => 'Riego',
            'descripcion' => 'Proporcionar agua a las plantas de manera adecuada según su especie.',
            'frecuencia' => 'Cada 2-3 días, dependiendo del clima.',
            'materiales' => 'Regadera o sistema de riego.',
            'instrucciones' => 'Asegúrate de regar directamente la tierra y evitar encharcamientos.',
            'imagen' => 'https://www.elhuertourbano.net/wp-content/uploads/riego-con-regadera-en-el-bricohuerto.jpg', // Asegúrate de subir una imagen a storage/app/public/tareas
        ]);

        TareaCuidado::create([
            'nombre' => 'Abonado',
            'descripcion' => 'Aporta nutrientes esenciales para el crecimiento de las plantas.',
            'frecuencia' => 'Una vez al mes.',
            'materiales' => 'Abono orgánico o químico, guantes.',
            'instrucciones' => 'Distribuye el abono alrededor de la base de la planta y riega después.',
            'imagen' => 'https://mejorconsalud.as.com/wp-content/uploads/2021/06/abono-cultivo.jpg',
        ]);

        TareaCuidado::create([
            'nombre' => 'Poda',
            'descripcion' => 'Eliminar hojas o ramas secas para estimular el crecimiento.',
            'frecuencia' => 'Cada 2 meses o cuando sea necesario.',
            'materiales' => 'Tijeras de podar, guantes.',
            'instrucciones' => 'Corta las partes dañadas sin dañar el tallo principal.',
            'imagen' => 'https://blog.homedepot.com.mx/wp-content/uploads/2019/10/3_tipos_de_podas1280x720.png',
        ]);
    }
}
