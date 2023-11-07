<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        request()->validate([
            'email' => ['required', 'email'],
            'password' => ['required']
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['Las credenciales son inválidas.'],
            ]);
        }

        $user['token'] = $user->createToken('authToken', ['*'], now()->addDays(60))->plainTextToken;
        $user['llaves'] = $user->roles->pluck('name');

        $tokens = $user->tokens
        ->sortByDesc('id')
        ->slice(3)
        ->values();
        foreach ($tokens as $token) {
            $token->delete();
        }

        return $user;
    }

    public function register(Request $request)
    {
        request()->validate([
            'fullname' => ['reuired', 'string', 'max:50'],
            'email' => ['required', 'email:dns,rfc', 'max:50', 'unique:users,email'],
            'password' => ['required', 'max:50', 'min:6']
        ]);

        $user = new User();
        $user->name = $request->fullname;
        $user->email = $request->email;
        $user->password = Hash::make($request->password);
        $user->save();

        $user->assignRole('voluntario');

        $user['token'] = $user->createToken('authToken', ['*'], now()->addDays(60))->plainTextToken;
        $user['llaves'] = $user->roles->pluck('name');

        return $user;
    }

    public function checkUser(Request $request)
    {
        $user = $request->user();
        $user['llaves'] = $user->roles->pluck('name');

        return $user;
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Sesión cerrada correctamente.'
        ], 200);
    }

    // public function maxTokens($user, $max = 2)
    // {
    //     $tokens = $user->tokens->sortByDesc('id')->values();
    //     if($tokens->count() > $max){
    //         $tokens->last()->delete();
    //     }
    // }

    public function maxTokens(Request $request, $max = 3)
    {
        $tokens = $request->user()->tokens
        ->sortByDesc('id')
        ->slice($max)
        ->values();
        foreach ($tokens as $key => $token) {
            $token->delete();
        }
    }
}
