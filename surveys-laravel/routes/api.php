<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\JWTController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\UserController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

//JWT 
Route::group(['middleware' => 'api'], function($router) {
    Route::post('/register', [JWTController::class, 'register']);
    Route::post('/login', [JWTController::class, 'login']);
    Route::post('/logout', [JWTController::class, 'logout']);
    Route::post('/refresh', [JWTController::class, 'refresh']);
    Route::post('/profile', [JWTController::class, 'profile']);
});

//Admin Routes
Route::group(['prefix' => 'admin'], function(){
    Route::post('/add_survey', [AdminController::class, 'addSurvey'])->name("add_survey");
    Route::post('/add_question', [AdminController::class, 'addQuestion'])->name("add_question");
    Route::post('/add_answer_choice', [AdminController::class, 'addAnswerChoice'])->name("add_answer_choice");
    Route::get('/get_survey', [AdminController::class, 'getSurvey'])->name("get_survey");
    Route::get('/get_question/{survey_id}', [AdminController::class, 'getQuestion'])->name("get_question");
    Route::get('/get_answer_choice/{survey_id}', [AdminController::class, 'getAnswerChoice'])->name("get_answer_choice");
});

//User Routes
Route::group(['prefix' => 'user'], function(){
    Route::post('/add_answer', [UserController::class, 'addAnswer'])->name("add_answer");
});

