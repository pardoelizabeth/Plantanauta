<?php

namespace App\Http\Controllers;

use App\Models\TareaCuidado;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TareaDeCuidadoController extends Controller
{
    public function index()
    {
        $tareas = TareaCuidado::all();
        return Inertia::render('TareasDeCuidado', ['tareas' => $tareas]);
    }

    public function create()
    {
        return Inertia::render('TareasDeCuidado/Crear');
    }

    public function store(Request $request)
    {
        $request->validate([
            'nombre' => 'required|string|max:255',
            'descripcion' => 'required|string',
            'frecuencia' => 'nullable|string',
            'materiales' => 'nullable|string',
            'instrucciones' => 'nullable|string',
            'imagen' => 'nullable|url',
        ]);

        TareaCuidado::create($request->all());

        return redirect()->route('tareascuidado.index');
    }

    public function edit($id)
    {
        $tarea = TareaCuidado::findOrFail($id);
        return Inertia::render('TareasDeCuidadoEdit', ['tarea' => $tarea]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'nombre' => 'required|string|max:255',
            'descripcion' => 'nullable|string',
            'frecuencia' => 'nullable|string',
            'materiales' => 'nullable|string',
            'instrucciones' => 'nullable|string',
            'imagen' => 'nullable|string',
        ]);

        $tarea = TareaCuidado::findOrFail($id);
        $tarea->update($request->all());

        return redirect()->route('tareascuidado.index')->with('success', 'Tarea actualizada correctamente.');
    }

    public function destroy($id)
    {
        $tarea = TareaCuidado::findOrFail($id);
        $tarea->delete();

        return redirect()->route('tareascuidado.index')->with('success', 'Tarea eliminada.');
    }
}
