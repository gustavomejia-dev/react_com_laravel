<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreUpdateUserRequest;
use App\Http\Resources\UserResource;

use App\Models\UserMaster;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{

    /* SEMPRE UTILIZAR RESOURCES PARA RETORNO DE DADOS DE API */


    public function list(Request $request){
        $onlyReq = $request->only('name', 'email');
            
            if($onlyReq['name'] != null || $onlyReq['email'] != null){
                
                    $users = UserMaster::select('id',  'name' , 'email', 'created_at')
                                    ->where('name', 'LIKE' , "{$onlyReq['name']}%")
                                    ->where('email' , 'LIKE' , "{$onlyReq['email']}%")->get();



                               
                    if(count($users) > 0){

                       return response()->json([
                         'qtd' => count($users),
                         'data' => UserResource::collection($users)
                    ], 200);
                 }     
        }    
            return response()->json(['result' => false], 200);
            
        }   
    

    public function index(): ResourceCollection{
        $users = UserMaster::paginate();
        return UserResource::collection($users);// traz uma collection com outra dentro
    }
    
    public function store(StoreUpdateUserRequest $request){
        die('aquii');
        $data = $request->validated();//enviando apenas valores validados
        
        $data['password'] = bcrypt($request->password);//encript password
    
        $user = UserMaster::create($data);//tomar cuidado ao enviar um array
        // return $user;
        return new UserResource($user);
    }

    public function show(string $id){
        /* PRIMEIRA FORMA 
        $user = User::find($id)->first();
        if(!$user){
            return response()->json(['message' => 'user not found'], 404);
        }
         */
        
        $user = UserMaster::findOrFail($id);
        return new UserResource($user);
    }

    public function update(StoreUpdateUserRequest $request, string $id){
        $data = $request->all();
        $user = UserMaster::findOrFail($id);
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
            $token = U:find(4)->createToken('token_name');
 
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
