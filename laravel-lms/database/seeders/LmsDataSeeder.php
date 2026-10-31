<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Course;
use App\Models\Languages;
use App\Models\Level;
use App\Models\Outcome;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class LmsDataSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Categories
        $categories = [
            'Web Development',
            'Mobile Development',
            'Digital Marketing',
            'Graphic Design',
            'Software Design',
            'Content Writing',
            'Finance & Accounting',
            'Artificial Intelligence & Data',
        ];

        foreach ($categories as $cat) {
            Category::firstOrCreate(['name' => $cat], ['status' => 1]);
        }

        // 2. Levels
        $levels = ['Beginner', 'Intermediate', 'Advance'];
        foreach ($levels as $lvl) {
            Level::firstOrCreate(['name' => $lvl], ['title' => $lvl, 'status' => 1]);
        }

        // 3. Languages
        $languages = ['English', 'Urdu', 'Hindi', 'Spanish'];
        foreach ($languages as $lang) {
            Languages::firstOrCreate(['name' => $lang], ['status' => 1]);
        }

        // 4. Default Instructor & Student User
        $user = User::firstOrCreate(
            ['email' => 'admin@lms.com'],
            [
                'name' => 'Syed Mujtaba',
                'password' => Hash::make('password123'),
            ]
        );

        $catWeb = Category::where('name', 'Web Development')->first();
        $lvlAdv = Level::where('name', 'Advance')->first();
        $lvlBeg = Level::where('name', 'Beginner')->first();
        $langEn = Languages::where('name', 'English')->first();

        // 5. Sample Courses
        $c1 = Course::firstOrCreate(
            ['title' => 'The Complete 2026 Web Development Bootcamp'],
            [
                'category_id' => $catWeb->id,
                'level_id' => $lvlAdv->id,
                'language_id' => $langEn->id,
                'sell_price' => 4999.00,
                'cross_price' => 9999.00,
                'description' => 'Master Full Stack Web Development with Laravel 12, React 19, Tailwind CSS and MySQL. From beginner to job-ready professional engineer.',
                'status' => 1,
                'user_id' => $user->id,
            ]
        );

        Outcome::firstOrCreate([
            'course_id' => $c1->id,
            'text' => 'Build robust full-stack web applications with React & Laravel',
        ], [
            'sort_order' => 1,
        ]);
        Outcome::firstOrCreate([
            'course_id' => $c1->id,
            'text' => 'Master REST APIs, Sanctum authentication and database optimization',
        ], [
            'sort_order' => 2,
        ]);

        $c2 = Course::firstOrCreate(
            ['title' => 'Mastering React 19 & Next.js for Enterprise'],
            [
                'category_id' => $catWeb->id,
                'level_id' => $lvlBeg->id,
                'language_id' => $langEn->id,
                'sell_price' => 3999.00,
                'cross_price' => 7999.00,
                'description' => 'Comprehensive React architecture guide covering Server Actions, state management, hooks, and modern frontend design.',
                'status' => 1,
                'user_id' => $user->id,
            ]
        );

        Outcome::firstOrCreate([
            'course_id' => $c2->id,
            'text' => 'Create lightning-fast interactive Single Page Applications',
        ], [
            'sort_order' => 1,
        ]);
    }
}
