<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\Api\AuthRequest;
use App\Mail\MailableResetPassword;
use App\Models\User;
use App\Models\UserForgotPassword;
use Exception;

use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Password;

class PasswordController extends Controller
{
    public function resetPassword(Request $request){
        $data = $request->only(['email', 'token', 'password']);
       
        //criar uma form request para validar tudo isso
        // return response()->json(['result' => $data], 200);
        
        $UserForResetPassword = User::where('email', $data['email'])->first();
  
         //usuario quer resetar a senha?
         $user = UserForgotPassword::where('email', $data['email'])->first();
         if($user['token'] == $data['token']){
             $UserForResetPassword->fill([
                 'password' => Hash::make($data['password'])
             ]);
             $UserForResetPassword->save();
             $UserForResetPassword->tokens()->delete();
             return response()->json(['result' => $UserForResetPassword]);
         }else{
             return response()->json(['result' => 'Incorrect Token'], 404);
         }
        
        
        
    }
    public function forgotPassword(Request $request){
        $email = $request->validate(['email' => 'required|email']);//criar regra para não enviar email, se o email for invalido
        
        
        $token = str_pad(random_int(1,9999), 4, '0', STR_PAD_LEFT);//tem que criar metodo para gerar tokens aleatorios
        try{
                    $sendEmail = Mail::to('ti@wdio.com.br', 'Suporte')->send(new MailableResetPassword(
                        [


                            'fromEmail' => $email['email'],
                            'token' => $token,
                            'link' =>  '0'

                        ]) ) ;
                    
                    UserForgotPassword::create(['name' => '', 'email' => $email['email'], 'token' => $token]);
                    return response()->json(['result' => 'success'], 200);
        }catch(Exception $error){
            return response()->json(['result' => 'error'], 200);
        }
        

    }
}
