<?php

namespace App\Http\Controllers;

use App\Models\Career;
use App\Models\Home;
use App\Models\Work;
use App\Models\Coding;
use App\Models\Health;
use Illuminate\Http\Request;

class GoalsController extends Controller
{
    public function init (Request $request) {
        $request->validate([
            'date' => 'required|date_format:Y-m-d',
        ]);
    
        $date = $request->input('date');

        $codingData = Coding::whereDate('date', $date)->get();
        $healthData = Health::whereDate('date', $date)->get();
        $workData = Work::whereDate('date', $date)->get();
        $homeData = Home::whereDate('date', $date)->get();
        $careerData = Career::whereDate('date', $date)->get();
        return response()->json([
            'work'=>$workData,
            'coding' => $codingData, 
            'career' => $careerData, 
            'home' => $homeData,
            'health' => $healthData]);
    }
    public function calendar (Request $request) {
        $request->validate([
            'year'=>'integer',
            'month'=>'string',
        ]);
        $year = $request->year;
        $month = $request->month;
        $codingData = Coding::whereYear('created_at', $year)->whereMonth('created_at', $month)->get();
        $healthData = Health::whereYear('created_at', $year)->whereMonth('created_at', $month)->get();
        $workData = Work::whereYear('created_at', $year)->whereMonth('created_at', $month)->get();
        $homeData = Home::whereYear('created_at', $year)->whereMonth('created_at', $month)->get();
        $careerData = Career::whereYear('created_at', $year)->whereMonth('created_at', $month)->get();

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
        return response()->json([
            'organized_data' => $organizedData,
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
