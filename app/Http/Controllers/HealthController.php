<?php

namespace App\Http\Controllers;

use App\Models\Health;
use Illuminate\Http\Request;

class HealthController extends Controller
{
    public function init () {
        return response()->json(['message'=>'HealthData', 200]);
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
        Health::create([
            'content'=>$request->goal,
            'status'=>$request->status,
            'date'=>$request->date,
            'user_id'=>$userId,
        ]);
        return response()->json([200]);
    }
    public function delete_goal ($id) {
        $goal = Health::find($id);
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
        $goal = Health::find($id);
        $goal->update(['status'=>$status]);
        return response()->json(['message'=>'Status updated']);
    }
}
