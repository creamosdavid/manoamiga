<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('auth/login', [App\Http\Controllers\AuthController::class, 'login']);
Route::post('auth/register', [App\Http\Controllers\AuthController::class, 'register']);

Route::group(['middleware' => 'auth:sanctum'], function () {
    Route::get('/user', [App\Http\Controllers\AuthController::class, 'checkUser']);
    Route::get('/user/max-tokens', [App\Http\Controllers\AuthController::class, 'maxTokens']);
    Route::get('/auth/logout', [App\Http\Controllers\AuthController::class, 'logout']);
});
