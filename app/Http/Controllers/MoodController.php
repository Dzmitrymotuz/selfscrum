<?php

namespace App\Http\Controllers;

use App\Models\Mood;
use Illuminate\Http\Request;

class MoodController extends Controller
{
    public function mood_change (Request $request) {
        $request->validate([
            'mood_value'=>'string|nullable',
        ]);
        $user = auth()->user();
        $userId = $user->id;
        $currentDate = now()->toDateString();
        $mood = Mood::whereDate('created_at', $currentDate)->where('user_id', $userId)->first();
        if (!$mood) {
            $mood = new Mood();
            $mood->created_at = $currentDate;
            $mood->user_id = $userId;

        }
        $mood->mood = $request->input('mood_value');
        $mood->save();

        return response()->json(['message' => 'Mood updated successfully'], 200);
    }
    public function get_mood () {
        $currentDate = now()->toDateString();
        $user = auth()->user();
        $userId = $user->id;
        $mood = Mood::whereDate('created_at', $currentDate)->where('user_id', $userId)->first();
        if (!$mood) {
            $mood = 5;
        }
        return response()->json(['mood'=>$mood]);
    }
}
