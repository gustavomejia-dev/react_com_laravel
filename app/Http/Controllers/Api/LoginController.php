<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\AuthRequest;
use App\Mail\MailableResetPassword;
use App\Models\Tenant;
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


    public function isTenantExist(Request $request){
        // return 'aqui';
       $result =  isTenantExistHelper($request->domain);
        return $result;
       
    }
    public function login (AuthRequest $request){
    
    
        
        $validated = $request->validated();
        
        
 
        $user = User::where('email', $validated['email'])->where('tenant_id', $validated['tenant_id'])->first();
         
        //caso o checkbox remember me esteja selecionado,  cai nesse if
        // if(isset($validated['remember_token'])){
           
        //     //adicionando o remember token e acrescentando no final do token as duas primeiras letras do nome do usuario;
        //     $user->remember_token = $user->makeVisible('remember_token')->remember_token . substr($user->name, 0, 2);
                 
        // }
        //verificando as credenciais fornececidas pelo usuario
        if(!$user || !Hash::check($validated['password'], $user->password)){
            return response()->json(['result' =>'Invalid Credentials'], 404);
        }
        
        $user->tokens()->delete();//desloga de todos os outros dispositivos logados
        //token de autenticação
        $token = $user->createToken('token_name')->plainTextToken;
        // return $token;
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

   
   
  
    // public function forgotPassword(Request $request){
        
    //     $email = $request->validate(['email' => 'required|email']);//criar regra para não enviar email, se o email for invalido
        
        
    //     $token = str_pad(random_int(1,9999), 4, '0', STR_PAD_LEFT);//tem que criar metodo para gerar tokens aleatorios
    //     try{
    //                 $sendEmail = Mail::to('ti@wdio.com.br', 'Suporte')->send(new MailableResetPassword(
    //                     [


    //                         'fromEmail' => $email['email'],
    //                         'token' => $token,
    //                         'link' =>  '0'

    //                     ]) ) ;
                    
    //                 UserForgotPassword::create(['name' => '', 'email' => $email['email'], 'token' => $token]);
                    
    //                 return response()->json(['result' => 'success'], 200);
    //     }catch(Exception $error){
            
    //         return response()->json(['result' => 'error'], 200);
    //     }
        

    // }
}
