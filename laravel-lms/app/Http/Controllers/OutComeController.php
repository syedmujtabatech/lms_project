<?php

namespace App\Http\Controllers;

use App\Models\Outcome;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class OutComeController extends Controller
{
    public function index(Request $request){
        $outcomes = Outcome::where('course_id',$request->course_id)->get();
        return response()->json([
            'status' => 200,
            'data' => $outcomes,
        ]);
    }
    public function store(Request $request){
        $validator = Validator::make($request->all(),[
          'outcome' => 'required' 
        ]);
        if($validator->fails()){
           return response()->json([
            'status' => 400,
            'errors' => $validator->errors(),
        ]);
        }  
         $outcomes = new Outcome();
         $outcomes->course_id = $request->course_id;
         $outcomes->text = $request->outcome;
         $outcomes->sort_order = 100;
         $outcomes->save();
           return response()->json([
            'status' => 200,
            'data' => $outcomes,

            'message' => 'Outcome addes successfully'
        ],200);
    }

      public function update($id,Request $request){
        $outcomes   = Outcome::find($id);
        if($outcomes == null){
           return response()->json([
            'status' => 401,
            'message' => 'Outcome not found',
        ],404);
        }  

        $validator = Validator::make($request->all(),[
          'outcome' => 'required' 
        ]);

        if($validator->fails()){
           return response()->json([
            'status' => 400,
            'errors' => $validator->errors(),
        ]);
        }  
         
         $outcomes->text = $request->outcome;         
         $outcomes->save();
           return response()->json([
            'status' => 200,
            'data' => $outcomes,
            'message' => 'Outcome updated successfully'
        ],200);
    }
    public function destroy($id){
  $outcomes = Outcome::find($id);
        if($outcomes == null){
           return response()->json([
            'status' => 401,
            'message' => 'Outcome not found',
        ],404);
        }  
        $outcomes->delete();
          return response()->json([
            'status' => 200,
            'message' => 'Outcome deleted successfully'
        ],200);
    }
}
