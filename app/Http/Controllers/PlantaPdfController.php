<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Planta;
use Barryvdh\DomPDF\Facade\Pdf;

use App\Models\UserPlanta; // agrega esto arriba

class PlantaPdfController extends Controller
{
    public function descargar($id)
    {
        $userPlanta = UserPlanta::with('planta')->findOrFail($id);
        $pdf = Pdf::loadView('pdf.planta', [
            'userPlanta' => $userPlanta,
            'planta' => $userPlanta->planta, // planta base
        ]);
        return $pdf->download('planta_' . $userPlanta->nombre . '.pdf');
    }
}


