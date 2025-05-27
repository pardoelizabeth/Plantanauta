<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

use Illuminate\Validation\Rule;

class UsuarioController extends Controller
{
    public function index()
{
    $usuarios = User::all();
    $authUserId = auth()->id();  // ID del usuario autenticado
    return Inertia::render('Usuarios/Index', [
        'usuarios' => $usuarios,
        'authUserId' => $authUserId,
    ]);
}


    public function edit(User $user)
    {
        return Inertia::render('Usuarios/Edit', ['usuario' => $user]);
    }

public function update(Request $request, $id)
{
    $usuario = User::findOrFail($id);

    $request->validate([
        'name' => 'required|string|max:255',
        'email' => [
            'required',
            'email',
            'max:255',
            Rule::unique('users')->ignore($usuario->id),
        ],
        'role' => 'required|in:admin,usuario',
    ]);

    $usuario->update($request->only(['name', 'email', 'role']));

    return redirect()->route('usuarios.index')->with('success', 'Usuario actualizado correctamente.');
}


    public function destroy(User $user)
    {
        $user->delete();
        return redirect()->route('usuarios.index')->with('success', 'Usuario eliminado.');
    }
}

