<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth;
use App\Models\survey;

class AdminController extends Controller
{
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
}
