<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class UserController extends Controller
{
    public function register(Request $request) {
        $request->validate([
            'name'=>'string|required',
            'email'=>'required|email',
            'password'=>'required|min:8|confirmed',
        ]);
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
        ]);

        $token = $user->createToken('authToken')->plainTextToken;
        return response()->json(['message'=>'Registration API respond', 'token' => $token]);
    }
    public function login(Request $request) {
            $credentials = $request->validate([
                // 'name'=>'string',
                'email'=>'required',
                'password'=>'required'
            ]);
        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            $token = $user->createToken('authtoken')->plainTextToken;
            return response()->json(['message'=>'Login Successful', 'token'=>$token, 'user'=>$user]);
        }
        throw ValidationException::withMessages([
            'email' => [__('auth.failed')],
        ]);
    }
    public function logout(Request $request) {
        $user = Auth::user();
        $request->user()->tokens()->delete(); 
        return response()->json(['message' => 'Logged out successfully']);
        // return response()->json(['message'=>'Logout API respond']);
    }
}
