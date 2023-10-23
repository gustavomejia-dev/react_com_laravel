<?php

namespace App\Http\Controllers\Api;




use App\Http\Controllers\Controller;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Http\Request;

use Illuminate\Validation\Rules;
use App\Mail\MailableResetPassword;
use App\Models\UserForgotPassword;
use Illuminate\Support\Str;
use Exception;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Password;

class PasswordController extends Controller
{
    public function store(Request $request){
             
        $rules = [
            'codigo' => ['required'],
            'email' => ['required', 'email'],
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ];

        $messages = [
            'email.required|email' => 'Email Invalid',
            'codigo.required' => 'Token is Required',
            'password.required' => 'Digite uma senha',
            'password.confirmed' => 'Senhas incompátiveis'
        ];
        $validated = $request->validate($rules, $messages);
        
        
        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'codigo'),
            function ($user) use ($request) {
                $user->forceFill([
                    'password' => Hash::make($request->password),
                    'remember_token' => Str::random(60),
                ])->save();

                event(new PasswordReset($user));
            }
        );
        return response()->json(['result', 'oii']);
             
         
        
        
        
    }
    public function forgotPassword(Request $request){
        $email = $request->validate(['email' => 'required|email']);//criar regra para não enviar email, se o email for invalido
        
        
        $token = str_pad(random_int(1,9999), 5, '0', STR_PAD_LEFT);//tem que criar metodo para gerar tokens aleatorios
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
