<?php

use App\Http\Controllers\AccountController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\OutComeController;
use Illuminate\Support\Facades\Route;

// Public Authentication
Route::post('register', [AccountController::class, 'register']);
Route::post('login', [AccountController::class, 'login'])->name('login');

// Public Course & Metadata Endpoints
Route::get('/courses', [CourseController::class, 'index']);
Route::get('/course/meta-data', [CourseController::class, 'metaData']);
Route::get('/course/show/{id}', [CourseController::class, 'show']);

// Authenticated Routes (Sanctum)
Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::get('/user', [AccountController::class, 'user']);
    Route::post('/change-password', [AccountController::class, 'updatePassword']);
    Route::post('/update-profile', [AccountController::class, 'updateProfile']);

    // Course Management
    Route::post('/course', [CourseController::class, 'store']);
    Route::post('/course/update/{id}', [CourseController::class, 'update']);
    Route::delete('/course/{id}', [CourseController::class, 'destroy']);
    Route::get('/my-courses', [CourseController::class, 'myCourses']);

    // Course Outcomes
    Route::get('/outcomes/lists', [OutComeController::class, 'index']);
    Route::post('/outcomes/create', [OutComeController::class, 'store']);
    Route::put('/outcomes/{id}', [OutComeController::class, 'update']);
    Route::delete('/outcomes/destroy/{id}', [OutComeController::class, 'destroy']);
});
