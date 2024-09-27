<?php

namespace App\Http\Controllers;

use App\Models\WordOfDay;
use Illuminate\Http\Request;

class WordOfTheDayController extends Controller
{
    public function init (Request $request) {
        $request->validate([
            'text'=>'string|nullable',
            'date'=>'required|date_format:Y-m-d'
        ]);
        $user = auth()->user();
        $userId = $user->id;
        $date = $request->date;
        $currentDate = now()->toDateString();
        WordOfDay::create([
            'user_id'=>$userId,
            'word'=>$request->text,
            'date'=>$request->date,
        ]); 
        return response()->json(['message' => 'Word stored!'], 200);
    }
    
}
