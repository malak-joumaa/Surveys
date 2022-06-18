<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\answer;
use Auth;

class UserController extends Controller
{
    //Add answer
    public function addAnswer (Request $request){
        $user = Auth::user();
        $answer = new answer;
        $answer->answer = $request->answer;
        $answer->survey_id = $request->survey_id;
        $answer->question_id = $request->question_id;
        $answer->user_id = $user->id;
        $answer->save();
        return response()->json([
            "status" => "Success",
            "answer" => $answer
        ], 200);
    }
}
