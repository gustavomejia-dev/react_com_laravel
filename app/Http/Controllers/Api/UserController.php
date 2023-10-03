<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreUpdateUserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{

    /* SEMPRE UTILIZAR RESOURCES PARA RETORNO DE DADOS DE API */
    public function index(){
        $users = User::paginate();
        return UserResource::collection($users);// traz uma collection com outra dentro
    }
    
    public function store(StoreUpdateUserRequest $request){
        $data = $request->validated();//enviando apenas valores validados
  
        $data['passowrd'] = bcrypt($request->password);//encript password
        $user = User::create($data);//tomar cuidado ao enviar um array
  
        return new UserResource($user);
    }

    public function show(string $id){
        /* PRIMEIRA FORMA 
        $user = User::find($id)->first();
        if(!$user){
            return response()->json(['message' => 'user not found'], 404);
        }
         */
        
        $user = User::findOrFail($id);
        return new UserResource($user);
    }

    public function update(StoreUpdateUserRequest $request, string $id){
        $data = $request->all();
        $user = User::findOrFail($id);
        if($request->password){
            $data['password'] = bcrypt($request->getPassword());
        }
        
        
        $user->update($data);
        return new UserResource($user);
    }

    public function destroy(string $id){
        $user = User::findOrFail($id)->delete();
        return response()->json([], 204);
    }

    public function login(Request $request){
        // return response()->json(['result' => [$request->email, $request->password]], 200);
        // if(Auth::attempt(['email' =>$request->email, 'password' => $request->password])){
            // $user = Auth::user();
            $token = User::find(4)->createToken('token_name');
 
            return ['token' => $token->plainTextToken];
            // $user = User::where('email', $request->email)->get();
            // $token = $user->createToken('token_name');

            // return response()->json(['result' => $token], 200);
            // $token = $user->createToken('JWT');

        
         return response()->json(['result' => 'not found'], 404);
        // $email = 'skate@hotmail.com';
        // $user = User::where('email', $request->email)->firstOrFail();
        // return response()->json($user, 404);
        // if($user){
            
        //     return gettype($user);
        // }
        // return response()->json(['result' => 'not found'], 404);
        
    }
}
