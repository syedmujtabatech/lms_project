<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Course;
use App\Models\Languages;
use App\Models\Level;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CourseController extends Controller
{
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|min:5'
        ]);
        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->errors()
            ]);
        }
        $course = new Course();
        $course->title = $request->title;
        $course->status = 0;
        $course->user_id = $request->user()->id;
        $course->save();

        return response()->json([
            'status' => 200,
            'data' => $course,
            'message' => 'Course has been created successfully.'
        ]);
    }

    public function update($id, Request $request)
    {
        $course = Course::find($id);
        if ($course == null) {
            return response()->json([
                'status' => 404,
                'message' => 'Course not found'
            ], 404);
        }
        $validator = Validator::make($request->all(), [
            'title' => 'required|min:5',
            'category_id' => 'required',
            'level_id' => 'required',
            'language_id' => 'required',
            'sell_price' => 'required'
        ]);
        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->errors()
            ]);
        }

        $course->title = $request->title;
        $course->category_id = $request->category_id;
        $course->level_id = $request->level_id;
        $course->language_id = $request->language_id;
        $course->sell_price = $request->sell_price;
        $course->cross_price = $request->cross_price;
        $course->description = $request->description;
        $course->save();

        return response()->json([
            'status' => 200,
            'data' => $course,
            'message' => 'Course has been update successfully.'
        ]);
    }

    public function show($id)
    {
        $course = Course::with(['category', 'level', 'language', 'outcomes', 'user'])->find($id);
        if ($course == null) {
            return response()->json([
                'status' => 404,
                'message' => 'Course not found'
            ], 200);
        }
        return response()->json([
            'status' => 200,
            'data' => $course,
        ]);
    }

    public function destroy($id, Request $request)
    {
        $course = Course::where('id', $id)
            ->where('user_id', $request->user()->id)
            ->first();

        if ($course == null) {
            return response()->json([
                'status' => 404,
                'message' => 'Course not found'
            ], 200);
        }

        $course->outcomes()->delete();
        $course->delete();

        return response()->json([
            'status' => 200,
            'message' => 'Course deleted successfully'
        ], 200);
    }

    public function metaData()
    {
        $categories = Category::all();
        $levels = Level::all();
        $languages = Languages::all();
        return response()->json([
            'status' => 200,
            'categories' => $categories,
            'levels' => $levels,
            'languages' => $languages
        ], 200);
    }

    public function index()
    {
        $courses = Course::with(['category', 'level', 'language', 'user'])
            ->latest()
            ->get();
        return response()->json([
            'status' => 200,
            'data' => $courses,
        ], 200);
    }

    public function myCourses(Request $request)
    {
        $courses = Course::where('user_id', $request->user()->id)
            ->with(['category', 'level', 'language'])
            ->latest()
            ->get();
        return response()->json([
            'status' => 200,
            'data' => $courses,
        ], 200);
    }
}
