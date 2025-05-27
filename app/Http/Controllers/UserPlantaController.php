<?php

namespace App\Http\Controllers;

use App\Models\Planta;
use App\Models\UserPlanta;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
use App\Notifications\RecordatorioRiego;
use Illuminate\Support\Facades\Mail;
use App\Mail\RecordatorioRiegoManual;



class UserPlantaController extends Controller
{
    public function index()
{
    $misPlantas = UserPlanta::with('planta:id,nombre') // si está relacionada con planta base
        ->where('user_id', auth()->id())
        ->get(['id', 'nombre', 'imagen', 'planta_id']); // incluir 'imagen'

    return Inertia::render('MisPlantas/Index', [
        'plantas' => $misPlantas,
    ]);
}


    public function create()
    {
        $plantas = Planta::select('id', 'nombre', 'agua')->get();
        return Inertia::render('MisPlantas/Create', [
            'plantas' => $plantas,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'nombre' => 'required|string|max:255',
            'imagen' => 'nullable|image|max:2048', // valida que sea imagen y no pese más de 2MB
            'planta_id' => 'nullable|exists:plantas,id',
            'frecuencia_riego' => 'nullable|string',
        ]);

        $rutaImagen = null;
        if ($request->hasFile('imagen')) {
            $rutaImagen = $request->file('imagen')->store('plantas', 'public');
            // Guarda la imagen dentro de storage/app/public/plantas
        }

        $userPlanta = new UserPlanta();
        $userPlanta->user_id = auth()->id();
        $userPlanta->nombre = $request->nombre;
        $userPlanta->planta_id = $request->planta_id;
        $userPlanta->frecuencia_riego = $request->frecuencia_riego;
        $userPlanta->imagen = $rutaImagen; // ruta relativa guardada en DB
        $userPlanta->save();

        return redirect()->route('mis-plantas.index')->with('success', 'Planta guardada');
    }

public function activarRecordatorio(Request $request)
{
    $request->validate([
        'id' => 'required|integer|exists:user_plantas,id',
        'correo' => 'required|email',
    ]);

    $registro = UserPlanta::findOrFail($request->id);
    $registro->recordatorios_activados = true;
    $registro->save();

    // Envía correo al correo introducido
    Mail::to($request->correo)->send(new RecordatorioRiegoManual($registro->nombre));

    return back()->with('success', 'Recordatorio activado y correo enviado.');
}

// Mostrar formulario de edición
public function edit($id)
{
    $userPlanta = UserPlanta::with('planta')->findOrFail($id);
    $plantas = Planta::all(['id', 'nombre']);

    return Inertia::render('MisPlantas/Edit', [
        'userPlanta' => $userPlanta,
        'plantas' => $plantas
    ]);
}


// Actualizar planta personalizada
public function update(Request $request, $id)
{
    $request->validate([
        'nombre' => 'required|string|max:255',
        'imagen' => 'nullable|image|max:2048',
        'frecuencia_riego' => 'nullable|string|max:255',
        'planta_id' => 'nullable|exists:plantas,id',
    ]);

    $userPlanta = UserPlanta::findOrFail($id);

    if ($request->hasFile('imagen')) {
        if ($userPlanta->imagen) {
            Storage::delete($userPlanta->imagen);
        }
        $imagenPath = $request->file('imagen')->store('public/plantas');
        $userPlanta->imagen = str_replace('public/', 'storage/', $imagenPath);
    }

    $userPlanta->update([
        'nombre' => $request->nombre,
        'frecuencia_riego' => $request->frecuencia_riego,
        'planta_id' => $request->planta_id,
    ]);

    return redirect()->route('mis-plantas.index')->with('success', 'Planta actualizada correctamente.');
}


// Eliminar planta
public function destroy($id)
{
    $userPlanta = UserPlanta::findOrFail($id);
    $userPlanta->delete();

    return redirect()->route('mis-plantas.index')->with('success', 'Planta eliminada correctamente.');
}


}
