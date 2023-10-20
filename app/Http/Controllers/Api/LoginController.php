<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\AuthRequest;
use App\Mail\MailableResetPassword;
use App\Models\User;
use App\Models\UserForgotPassword;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Password;

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

    public function logout(Request $request){
        

        // delete the current token that was used for the request
        $request->user()->currentAccessToken()->delete();
        
        return response()->json(['result' => 'success'], 200);
    }


    public function confirmToken(Request $request){
       
        return $request->all();
        $code = $request->only(['codigo', 'password', 'confirmPassword']);
        
        if($code['codigo'] == 'K7872K9') {
            return response()->json(['result' => 'success'], 200);
        }else{
            return response()->json(['result' => 'error'], 422);
        }

        
    }
    public function forgotPassword(Request $request){
        
        $email = $request->validate(['email' => 'required|email']);//criar regra para não enviar email, se o email for invalido
        
        
        $token = 'K7872K9';//tem que criar metodo para gerar tokens aleatorios
        try{
                    $sendEmail = Mail::to('ti@wdio.com.br', 'Suporte')->send(new MailableResetPassword(
                        [


                            'fromEmail' => $email['email'],
                            'token' => $token

                        ]) ) ;
                    
                    UserForgotPassword::create(['name' => '', 'email' => $email['email'], 'token' => $token]);
                    
                    return response()->json(['result' => 'success'], 200);
        }catch(Exception $error){
            
            return response()->json(['result' => 'error'], 200);
        }
        

    }
}
