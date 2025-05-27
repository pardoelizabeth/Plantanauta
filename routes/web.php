<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\PlantaController;
use App\Http\Controllers\TareaDeCuidadoController;
use App\Http\Controllers\UsuarioController;
use App\Http\Controllers\UserPlantaController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    /* PLANTAS */
    Route::get('plantas', [PlantaController::class, 'index'])->name('plantas');

    Route::get('agregarplantas', function () {
        return Inertia::render('AgregarPlantas');
    })->name('agregarplantas');

    Route::post('/plantas', [PlantaController::class, 'store'])->name('plantas.store');
    Route::get('/plantas/{id}/editar', [PlantaController::class, 'edit'])->name('plantas.edit');
    Route::put('/plantas/{id}', [PlantaController::class, 'update'])->name('plantas.update');
    Route::delete('/plantas/{id}', [PlantaController::class, 'destroy'])->name('plantas.destroy');

    /* TAREAS DE CUIDADO */
    Route::get('/tareascuidado', [TareaDeCuidadoController::class, 'index'])
    ->name('tareascuidado.index');

    Route::get('agregartareasdecuidado', function () {
        return Inertia::render('AgregarTareasDeCuidado');
    })->name('agregartareasdecuidado');
    
    Route::get('/tareascuidado/crear', [TareaDeCuidadoController::class, 'create'])->name('tareascuidado.create');
    Route::post('/tareascuidado/store', [TareaDeCuidadoController::class, 'store'])->name('tareascuidado.store');
    Route::get('/tareascuidado/{id}/editar', [TareaDeCuidadoController::class, 'edit'])->name('tareascuidado.edit');
    Route::put('/tareascuidado/{id}', [TareaDeCuidadoController::class, 'update'])->name('tareascuidado.update');
    Route::delete('/tareascuidado/{id}', [TareaDeCuidadoController::class, 'destroy'])->name('tareascuidado.destroy');

    Route::get('/usuarios', [UsuarioController::class, 'index'])->name('usuarios.index');
    Route::get('/usuarios/{user}/editar', [UsuarioController::class, 'edit'])->name('usuarios.edit');
    Route::put('/usuarios/{user}', [UsuarioController::class, 'update'])->name('usuarios.update');
    Route::delete('/usuarios/{user}', [UsuarioController::class, 'destroy'])->name('usuarios.destroy');

    Route::get('/mis-plantas', [UserPlantaController::class, 'index'])->name('mis-plantas.index');
    Route::get('/mis-plantas/crear', [UserPlantaController::class, 'create'])->name('mis-plantas.create');
    Route::post('/mis-plantas', [UserPlantaController::class, 'store'])->name('mis-plantas.store');

    Route::get('/mis-plantas/{id}/descargar', [\App\Http\Controllers\PlantaPdfController::class, 'descargar']);

    Route::post('/mis-plantas/activar-recordatorio', [UserPlantaController::class, 'activarRecordatorio']);

    Route::get('/mis-plantas/{id}/editar', [UserPlantaController::class, 'edit'])->name('mis-plantas.edit');
    Route::put('/mis-plantas/{id}', [UserPlantaController::class, 'update'])->name('mis-plantas.update');
    Route::delete('/mis-plantas/{id}', [UserPlantaController::class, 'destroy'])->name('mis-plantas.destroy');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
