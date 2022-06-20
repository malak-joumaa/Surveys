<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth;
use App\Models\survey;
use App\Models\question;
use App\Models\question_type;
use App\Models\answer_choice;

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
        $question->quetsion_type_id = $request->quetsion_type_id;
        $question->save();
        return response()->json([
            "status" => "Success",
            "question" => $question
        ], 200);
    }

    //Add answer_choices
    public function addAnswerChoice (Request $request){
        $user = Auth::user();
        $answer_choice = new answer_choice;
        $answer_choice->choice = $request->choice;
        $answer_choice->survey_id = $request->survey_id;
        $answer_choice->question_id = $request->question_id;
        $answer_choice->save();
        return response()->json([
            "status" => "Success",
            "answer_choice" => $answer_choice
        ], 200);
    }

    //Get survey
    public function getSurvey (){
        $survey = survey::all();
        return response()->json([
            "status" => "Success",
            "survey" => $survey
        ], 200);
    }

    // Get question
    public function getQuestion ($survey_id){
        $question = question::where('survey_id', $survey_id)->get();
        return response()->json([
            "question" => $question
        ], 200);
    }

    //Get answer_choices
    public function getAnswerChoice ($survey_id){
        $answer_choice = answer_choice::where('survey_id', $survey_id)->get();
        response()->json([
            "answer_choice" => $answer_choice
        ], 200);
        $question_ids=[$answer_choice[1]["question_id"]];
        $question_order = [[]];
        for($i=0; $i<count($answer_choice);$i++){
            if(in_array($answer_choice[$i]["question_id"],$question_ids)){
                for($j=0;$j<count($question_ids);$j++){
                    if($answer_choice[$i]["question_id"]==$question_ids[$j]){
                        array_push($question_order[$j],$answer_choice[$i]["choice"]);
                    }
                }
            }
            else{
                array_push($question_ids,$answer_choice[$i]["question_id"]);
                array_push($question_order,[]);
                for($j=0;$j<count($question_ids);$j++){
                    if($answer_choice[$i]["question_id"]==$question_ids[$j]){
                        array_push($question_order[$j],$answer_choice[$i]["choice"]);
                    }
                }
            }
        };
        return $question_order;
    }
}
