<?php
namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AccountController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|min:5',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:6'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->errors(),
                'message' => $validator->errors()->first()
            ], 200);
        }

        $user = new User();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = Hash::make($request->password);
        $user->save();

        return response()->json([
            'status' => 200,
            'message' => 'User Registered Successfully'
        ], 200);
    }

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->errors(),
                'message' => $validator->errors()->first()
            ], 200);
        }

        if (Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
            $user = User::find(Auth::user()->id);
            $token = $user->createToken('token')->plainTextToken;
            return response()->json([
                'status' => 200,
                'token' => $token,
                'name' => $user->name,
                'email' => $user->email,
                'id' => $user->id
            ], 200);
        } else {
            return response()->json([
                'status' => 401,
                'message' => 'Either email/password is incorrect.'
            ], 200);
        }
    }

    public function user(Request $request)
    {
        return response()->json([
            'status' => 200,
            'data' => $request->user(),
        ], 200);
    }

    public function updateProfile(Request $request)
    {
        $user = User::find($request->user()->id);

        $validator = Validator::make($request->all(), [
            'name' => 'required|min:3',
            'email' => 'required|email|unique:users,email,' . $user->id,
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->errors(),
                'message' => $validator->errors()->first(),
            ], 200);
        }

        $user->name = $request->name;
        $user->email = $request->email;
        $user->save();

        return response()->json([
            'status' => 200,
            'data' => $user,
            'message' => 'Profile updated successfully.',
        ], 200);
    }

    public function updatePassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'old_password' => 'required',
            'new_password' => 'required|min:6',
            'confirm_password' => 'required|same:new_password',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->errors(),
                'message' => $validator->errors()->first(),
            ], 200);
        }

        $user = User::find($request->user()->id);

        if (!Hash::check($request->old_password, $user->password)) {
            return response()->json([
                'status' => 400,
                'message' => 'Your old password does not match our records.',
            ], 200);
        }

        $user->password = Hash::make($request->new_password);
        $user->save();

        return response()->json([
            'status' => 200,
            'message' => 'Password has been updated successfully.',
        ], 200);
    }
}
