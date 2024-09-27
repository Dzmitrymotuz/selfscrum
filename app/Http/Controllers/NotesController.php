<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class NotesController extends Controller
{
    public function get_notes(Request $request) {

        $user = Auth::user();
        $userNotes = $user->notes()->with('note_title_id')->get();
        return response()->json(['message' => $userNotes]);
    }
}
