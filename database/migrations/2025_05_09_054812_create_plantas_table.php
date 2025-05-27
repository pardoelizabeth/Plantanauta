<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('plantas', function (Blueprint $table) {
            $table->id();
            $table->string('nombre');
            $table->enum('tipo', ['planta', 'flor'])->default('planta'); // <- nuevo campo
            $table->string('imagen')->nullable();
            $table->text('descripcion')->nullable();
            $table->string('florea')->nullable();
            $table->string('epoca')->nullable();
            $table->string('origen')->nullable();
            $table->string('agua')->nullable();
            $table->string('sol')->nullable();
            $table->string('temperatura')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('plantas');
    }
};
