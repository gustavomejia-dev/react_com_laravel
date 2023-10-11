 <?php

use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\LoginController;
use App\Http\Controllers\Api\RegisterController;
use Illuminate\Http\Request;
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


 Route::post('login', [LoginController::class, 'login']);
 Route::middleware(['auth:sanctum'])->group(function (){
    // Route::apiResource('/users', UserController::class);
    Route::post('logout', [LoginController::class, 'logout']);
    Route::post('register', [RegisterController::class, 'register']);
 });
 

// Route::post('/login', [LoginController::class, 'login']);
Route::apiResource('/users', UserController::class);
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
