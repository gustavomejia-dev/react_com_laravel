 <?php

use App\Events\SendMessageWebSocketEvent;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\LoginController;
use App\Http\Controllers\Api\PasswordController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\RegisterController;
use App\Http\Controllers\Api\TenantController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Mail\TesteMarkdown;
use App\Models\Tenant;
use Illuminate\Contracts\Mail\Mailer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Route;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
Route::get('websocket/{msg}', function ($msg){
    // die($msg);

    broadcast(new SendMessageWebSocketEvent($msg));
   
    // return "safe";
    
});
// Route::post('/testando', function (Request $request){
//     // $tenant = Tenant::all();
//     $a = 'hello';
//     $$a = "world";
//     return response()->json("$a {$$a}", 200);
    
    
        
Route::post('/verificandotenant',[TenantController::class, 'isTenantExist']);
Route::apiResource('/tenant', TenantController::class);    

// });
Route::post('teste',function (){
    Mail::to('ti@wdio.com.br', 'Suporte')->send(new TesteMarkdown());
});

Route::apiResource('/users', UserController::class);
 Route::post('/password/forgot-password',[PasswordController::class, 'forgotPassword']);
 Route::post('/password/store',[PasswordController::class, 'store']);
 Route::post('login', [LoginController::class, 'login']);
 Route::middleware(['auth:sanctum'])->group(function (){
    // Route::apiResource('/users', UserController::class);
    Route::post('logout', [LoginController::class, 'logout']);
    Route::post('/users/list', [UserController::class, 'list']);
    Route::post('register', [RegisterController::class, 'register']);
    Route::apiResource('/produto', ProductController::class);
    
 });
 

// Route::post('/login', [LoginController::class, 'login']);

// Route::delete('/users/{id}', [UserController::class, 'destroy']);
// Route::patch('/users/{id}', [UserController::class, 'update']);
// Route::get('/users/{id}', [UserController::class, 'show']);
// Route::get('/users', [UserController::class, 'index']);
// Route::post('/users', [UserController::class, 'store']);
Route::get('/', function (){
    return response()->json(
        [
            'success' =>true
        ]
        );
});
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
