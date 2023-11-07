<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class AdminController extends Controller
{
    public function consulta()
    {
        return response()->json([
            'consulta' => 'Activo',
        ], 200);
    }
}
