<?php

namespace App\Http\Controllers;

use App\Models\Mood;
use Illuminate\Http\Request;

class MoodController extends Controller
{
    public function mood_change (Request $request) {
        $request->validate([
            'mood_value'=>'string|nullable',
            'date'=>'required|date_format:Y-m-d'
        ]);
        $user = auth()->user();
        $userId = $user->id;
        $date = $request->date;
        $currentDate = now()->toDateString();
        $mood = Mood::whereDate('date', $date)->where('user_id', $userId)->first();
        if (!$mood) {
            $mood = new Mood();
            $mood->created_at = $currentDate;
            $mood->user_id = $userId;
            $mood->date = $request->date; 
        }
        $mood->mood = $request->input('mood_value');
        $mood->save();

        return response()->json(['message' => 'Mood updated successfully'], 200);
    }
    public function get_mood (Request $request) {
        $request->validate([
            'mood_value'=>'string|nullable',
            'date'=>'required|date_format:Y-m-d'
        ]);
        $date = $request->date;
        $currentDate = now()->toDateString();
        $user = auth()->user();
        $userId = $user->id;
        $mood = Mood::whereDate('date', $date)->where('user_id', $userId)->first();
        if (!$mood) {
            $mood = 5;
        }
        return response()->json(['mood'=>$mood]);
    }
    public function get_mood_range (Request $request) {
        $request->validate([
            'startDate'=>'required|date_format:Y-m-d',
            'endDate'=>'required|date_format:Y-m-d'
        ]);
        $startDate = $request->startDate;
        $endDate = $request->endDate;
        $mood_object = [];
        $user = auth()->user();
        $userId = $user->id;
        $moods = Mood::whereBetween('date', [$startDate, $endDate])->where('user_id', $userId)->get();
        foreach ($moods as $mood) {
            $mood_object[$mood->date] = $mood->mood;
        }
        return response()->json(['mood_object'=>$mood_object]);
    }
}
