<?php

namespace App\Http\Controllers;

use App\Models\Notes;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class NotesController extends Controller
{
    public function index(Request $request) {

        $user = Auth::user();
        $userNotes = $user->notes()->get();
        return response()->json(['message' => $userNotes]);
    }
    public function store(Request $request) {
        $user = Auth::user();
        // $id = $user->id;
        Notes::create([
            'title'=>$request->title,
            'user_id'=>$user->id,
            'note'=>$request->content,
            'date'=>$request->date,
        ]);
        return response()->json([200]);
    }
    public function destroy($id) {
        $note = Notes::find($id);
        if($note) {
            $note->delete();
            return response()->json(['message'=>'Note Deleted'], 200);
        }else {
            return response()->json(['message'=>'Note not found'], 404);
        }
    }
}
