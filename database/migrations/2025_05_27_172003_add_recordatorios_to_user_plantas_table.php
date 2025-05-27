<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::table('user_plantas', function (Blueprint $table) {
            $table->boolean('recordatorios_activados')->default(false);
            $table->string('correo_recordatorio')->nullable();
        });
    }

    public function down()
    {
        Schema::table('user_plantas', function (Blueprint $table) {
            $table->dropColumn(['recordatorios_activados', 'correo_recordatorio']);
        });
    }

};
