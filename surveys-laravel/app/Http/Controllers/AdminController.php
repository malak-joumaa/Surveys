<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth;
use App\Models\survey;
use App\Models\question;
use App\Models\question_type;

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
    public function addQuestionType (Request $request){
        $user = Auth::user();
        $question_type = new question_type;
        $question_type->type = $request->type;
        $question_type->save();
        return response()->json([
            "status" => "Success",
            "question" => $question_type
        ], 200);
    }

    // Add question
    public function addQuestion (Request $request){
        $user = Auth::user();
        $question = new question;
        $question->question = $request->question;
        $question->survey_id = $request->survey_id;
        $question->quetsion_type_id = $request->quetsion_type_id;
        $question->save();
        return response()->json([
            "status" => "Success",
            "question" => $question
        ], 200);
    }
}
