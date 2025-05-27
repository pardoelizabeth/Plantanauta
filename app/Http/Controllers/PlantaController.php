<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Planta;
use Illuminate\Http\Request;

class PlantaController extends Controller
{
    public function index()
    {
        $plantas = Planta::all();

        return Inertia::render('Plantas', [  // aquí debe coincidir el nombre del componente React
            'plantas' => $plantas,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'nombre' => 'required|string|max:255',
            'imagen' => 'nullable|url',
            'descripcion' => 'nullable|string',
            'tipo' => 'required|string',
            'florea' => 'required|string',
            'epoca' => 'nullable|string',
            'origen' => 'nullable|string',
            'agua' => 'nullable|string',
            'sol' => 'nullable|string',
            'temperatura' => 'nullable|string',
        ]);

        Planta::create($request->all());

        return redirect()->route('plantas')->with('success', 'Planta agregada correctamente');
    }

    public function edit($id)
    {
        $planta = Planta::findOrFail($id);
        return Inertia::render('PlantaEdit', [
            'planta' => $planta,
        ]);
    }

    public function update(Request $request, $id)
{
    $validated = $request->validate([
        'nombre' => 'required|string|max:255',
        'imagen' => 'nullable|string',
        'descripcion' => 'nullable|string',
        'florea' => 'required|string',
        'epoca' => 'nullable|string',
        'origen' => 'nullable|string',
        'agua' => 'nullable|string',
        'sol' => 'nullable|string',
        'temperatura' => 'nullable|string',
    ]);

    $planta = Planta::findOrFail($id);
    $planta->update($validated);

    return redirect()->route('plantas')->with('success', 'Planta editada exitosamente');
}


    public function destroy($id)
    {
        $planta = Planta::findOrFail($id);
        $planta->delete();

        return redirect()->route('plantas')->with('success', 'Planta eliminada exitosamente');
    }


}

