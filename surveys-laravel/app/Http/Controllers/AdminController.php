<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth;
use App\Models\survey;
use App\Models\question;

class AdminController extends Controller
{
    //Add Survey
    public function addSurvey (Request $request){
        $user = Auth::user();
        $survey = new survey;
        $survey->title = $request->title;
        $survey->save();
        return response()->json([
            "status" => "Success",
            "survey" => $survey
        ], 200);
    }

    // Add question
    public function addQuestion (Request $request){
        $user = Auth::user();
        $question = new question;
        $question->question = $request->question;
        $question->survey_id = $request->survey_id;
        $question->question_type_id = $request->question_type_id;
        $question->save();
        return response()->json([
            "status" => "Success",
            "question" => $question
        ], 200);
    }

    //Add answer
    public function addAnswer (Request $request){
        $user = Auth::user();
        $answer = new answer;
        $answer->answer = $request->answer;
        $answer->survey_id = $request->survey_id;
        $answer->questionid = $request->question_id;
        $answer->user_id = $request->user_id;
        $answer->save();
        return response()->json([
            "status" => "Success",
            "answer" => $answer
        ], 200);
    }
}
