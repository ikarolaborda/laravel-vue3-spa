<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    public function run()
    {
        $admin = User::create([
            'name' => 'Admin',
            'email' => 'admin@example.com',
            'password' => bcrypt('password'),
        ]);
        $admin->roles()->attach(Role::where('name','admin')->value('id'));

        $user = User::create([
            'name' => 'User',
            'email' => 'user@example.com',
            'password' => bcrypt('password'),
        ]);
        $user->roles()->attach(Role::where('name','user')->value('id'));
    }
}
