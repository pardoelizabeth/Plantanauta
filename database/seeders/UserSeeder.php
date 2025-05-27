<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UserSeeder extends Seeder
{
    public function run()
    {
        // Usuario administrador
        User::create([
            'name' => 'Admin',
            'email' => 'admin@gmail.com',
            'password' => Hash::make('password'),
            'role' => 'admin',
        ]);

        // Usuario normal
        User::create([
            'name' => 'Usuario',
            'email' => 'user@gmail.com',
            'password' => Hash::make('password'),
            'role' => 'usuario',
        ]);
    }
}

