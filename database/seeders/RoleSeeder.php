<?php

namespace Database\Seeders;

use App\Models\Permission;
use App\Models\Role;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $admin = Role::create(['name' => 'admin']);
        $admin->permissions()->attach(Permission::pluck('id'));
        $user = Role::create(['name' => 'user']);
        $user->permissions()->attach(Permission::where('name', '!=', 'posts.delete')->pluck('id'));
    }
}
