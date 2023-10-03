<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\AuthRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;

class LoginController extends Controller
{


    public function login (AuthRequest $request){
       
        // return response()->json($request->all(), 404);
        
        
        $validated = $request->validated();
        // return response()->json(gettype($validated), 200);
        
        $user = User::where('email', $validated['email'])->first();
        
        if(!$user || !Hash::check($validated['password'], $user->password)){
            return response()->json(['result' =>'Invalid Credentials'], 404);
        }
        
        $user->tokens()->delete();//desloga de todos os outros dispositivos logados
        
        $token = $user->createToken('token_name')->plainTextToken;
        // return response()->json($token);
        // $token = $request->user()->createToken($request->token_name);
        
        return response()->json(['result' => ['user' => $user, 'token' => $token]], 200);
           
               
    }

    public function verifyIpRequest(string $ip){
        $userIp = User::select('ip')->where('ip', $ip)->get();
        
    }

    public function register(){
        return response()->json('authorized', 200);
    }
}
