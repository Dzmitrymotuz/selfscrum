<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\MoodController;
use App\Http\Controllers\WorkController;
use App\Http\Controllers\GoalsController;
use App\Http\Controllers\CareerController;
use App\Http\Controllers\CodingController;
use App\Http\Controllers\HealthController;


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
//initial call for main page
Route::get('/init', [GoalsController::class, 'init']);
Route::get('/init-coding', [CodingController::class, 'init']);
Route::get('/init-career', [CareerController::class, 'init']);
Route::get('/init-work', [WorkController::class, 'init']);
Route::get('/init-health', [HealthController::class, 'init']);
Route::get('/init-home', [HomeController::class, 'init']);
//mood
Route::post('/mood-change', [MoodController::class, 'mood_change']);
Route::get('/get-mood', [MoodController::class, 'get_mood']);
//status
Route::post('/coding/status-change', [CodingController::class, 'status_change']);
Route::post('/career/status-change', [CareerController::class, 'status_change']);
Route::post('/work/status-change', [WorkController::class, 'status_change']);
Route::post('/health/status-change', [HealthController::class, 'status_change']);
Route::post('/home/status-change', [HomeController::class, 'status_change']);
//goal addition
Route::post('/coding/add-goal', [CodingController::class, 'add_goal']);
Route::post('/career/add-goal', [CareerController::class, 'add_goal']);
Route::post('/work/add-goal', [WorkController::class, 'add_goal']);
Route::post('/health/add-goal', [HealthController::class, 'add_goal']);
Route::post('/home/add-goal', [HomeController::class, 'add_goal']);
//goal deletion
Route::delete('/coding/delete/{id}', [CodingController::class, 'delete_goal']);
Route::delete('/work/delete/{id}', [WorkController::class, 'delete_goal']);
Route::delete('/health/delete/{id}', [HealthController::class, 'delete_goal']);
Route::delete('/career/delete/{id}', [CareerController::class, 'delete_goal']);
Route::delete('/home/delete/{id}', [HomeController::class, 'delete_goal']);
//calendar
Route::get('/calendar', [GoalsController::class, 'calendar']);

