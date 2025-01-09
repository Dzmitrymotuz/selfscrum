<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        \App\Models\Coding::factory(3)->create();
        \App\Models\Health::factory(3)->create();
        \App\Models\Work::factory(3)->create();
        \App\Models\Home::factory(3)->create();
        \App\Models\Career::factory(3)->create();
        \App\Models\User::factory(10)->create();

        \App\Models\User::factory()->create([
            'name' => 'Dzmitry Motuz',
            'email' => 'dzmitrymotuz@egmail.com',
        ]);
    }
}
