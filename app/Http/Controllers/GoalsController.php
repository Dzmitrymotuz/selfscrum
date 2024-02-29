<?php

namespace App\Http\Controllers;

use App\Models\Home;
use App\Models\Mood;
use App\Models\Work;
use App\Models\Career;
use App\Models\Coding;
use App\Models\Health;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class GoalsController extends Controller
{
    public function init (Request $request) {
        $request->validate([
            'date' => 'required|date_format:Y-m-d',
        ]);
        $date = $request->input('date');
        $user = auth()->user();
        $userId = $user->id;
        $codingData = Coding::whereDate('date', $date)->where('user_id', $userId)->get();
        $healthData = Health::whereDate('date', $date)->where('user_id', $userId)->get();
        $workData = Work::whereDate('date', $date)->where('user_id', $userId)->get();
        $homeData = Home::whereDate('date', $date)->where('user_id', $userId)->get();
        $careerData = Career::whereDate('date', $date)->where('user_id', $userId)->get();
        return response()->json([
            'work'=>$workData,
            'coding' => $codingData, 
            'career' => $careerData, 
            'home' => $homeData,
            'health' => $healthData,
        ]);
    }
    public function calendar (Request $request) {
        $request->validate([
            'year'=>'integer',
            'month'=>'string',
        ]);
        $user = auth()->user();
        $userId = $user->id;
        $year = $request->year;
        $month = $request->month;
        $codingData = Coding::whereYear('date', $year)->whereMonth('date', $month)->where('user_id', $userId)->get();
        $healthData = Health::whereYear('date', $year)->whereMonth('date', $month)->where('user_id', $userId)->get();
        $workData = Work::whereYear('date', $year)->whereMonth('date', $month)->where('user_id', $userId)->get();
        $homeData = Home::whereYear('date', $year)->whereMonth('date', $month)->where('user_id', $userId)->get();
        $careerData = Career::whereYear('date', $year)->whereMonth('date', $month)->where('user_id', $userId)->get();
        $moodData = Mood::whereYear('date', $year)->whereMonth('date', $month)->where('user_id', $userId)->get();

        $organizedData = [];
        foreach ($codingData as $item) {
            // $date = $item->created_at->format('Y-m-d');
            $date = date('Y-m-d', strtotime($item->date));
            $organizedData[$date]['coding'][] = $item;
        }
        foreach ($healthData as $item) {
            $date = date('Y-m-d', strtotime($item->date));
            $organizedData[$date]['health'][] = $item;
        }
        foreach ($workData as $item) {
            $date = date('Y-m-d', strtotime($item->date));
            $organizedData[$date]['work'][] = $item;
        }
        foreach ($homeData as $item) {
            $date = date('Y-m-d', strtotime($item->date));
            $organizedData[$date]['home'][] = $item;
        }
        foreach ($careerData as $item) {
            $date = date('Y-m-d', strtotime($item->date));
            $organizedData[$date]['career'][] = $item;
        }
        foreach ($moodData as $item) {
            $date = date('Y-m-d', strtotime($item->date));
            $organizedData[$date]['mood'][] = $item;
        }
        return response()->json([
            'organized_data' => $organizedData,
            'user'=> $user,
        ]);
        // return response()->json([
        //     'work'=>$workData,
        //     'coding' => $codingData, 
        //     'career' => $careerData, 
        //     'home' => $homeData,
        //     'health' => $healthData,
        // ]);
    }
    
}
