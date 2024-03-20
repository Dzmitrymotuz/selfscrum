<?php

namespace App\Http\Controllers;

use App\Models\Home;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function init (Request $request) {
        $request->validate([
            'startDate'=>'date',
            'endDate'=>'date', 
        ]);
        $user = auth()->user();
        $userId = $user->id;
        $startDate = $request->startDate;
        $endDate = $request->endDate;
        $goals = Home::whereBetween('date', [$startDate, $endDate])->where('user_id', $userId)->get() ;
        return response()->json(['goals'=>$goals, 200]);
    }
    public function add_goal (Request $request) {
        $request->validate([
            'category'=>'string|required',
            'goal'=>'string|required|nullable',
            'status'=>'integer',
            'date'=>'date'
        ]);
        if ($request->goal === null) {
            return response()->json(['message'=>'Provide some context']);
        }
        $user = auth()->user();
        $userId = $user->id;
        Home::create([
            'content'=>$request->goal,
            'status'=>$request->status,
            'date'=>$request->date,
            'user_id'=>$userId,
        ]);
        return response()->json([200]);
    }
    public function pass_to_next(Request $request) {
        $request->validate([
            'id'=>'integer',
            'date'=>'date'
        ]);
        $user = auth()->user();
        $id = $request->id;
        $goal = Home::find($id);
        if ($goal) {
            $goal->date = $request->date;
            $goal->save();
        }
        return response()->json([200]);
    }
    public function edit_goal(Request $request) {
        $request->validate([
            'id'=>'integer',
            'content'=>'string'
        ]);
        // $user = auth()->user();
        $id = $request->id;
        $goal = Home::find($id);
        if ($goal) {
            $goal->content = $request->content;
            $goal->save();
        }
        return response()->json([200]);
    }
    public function delete_goal ($id) {
        $goal = Home::find($id);
        if (!$goal) {
            return response()->json(['message'=>'Not found'], 404);
        }
        $goal->delete();
        return response()->json(['message' => 'Goal deleted successfully', 'goal'=>$goal], 200);
    }
    public function status_change(Request $request) {
        $request->validate([
            'status'=>'integer',
            'id'=>'integer'
        ]);
        $id = $request->id;
        $status = $request->status;
        $goal = Home::find($id);
        $goal->update(['status'=>$status]);
        return response()->json(['message'=>'Status updated']);
    }
}
