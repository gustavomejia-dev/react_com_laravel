<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\UserMaster;
use Database\Factories\UserFactory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {   
        UserMaster::factory()->count(50)->create();
    }
}
