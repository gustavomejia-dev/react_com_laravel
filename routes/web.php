<?php

use App\Events\SendMessageWebSocketEvent;
use App\Events\testWebSocket;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Teste;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Teste\TesteController;
use App\Jobs\SendEmailJob;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/testandoo', function () {
    SendEmailJob::dispatch();
    return 'Enviou';
});
Route::get("testando", function(){
    return view("sse");
});
Route::get('/sse', function(){
    
    date_default_timezone_set("America/New_York");
    header("Cache-Control: no-store");
    header("Content-Type: text/event-stream");
    
    $counter = rand(1, 10);
    while (true) {
      // Every second, send a "ping" event.
    
      echo "event: horario\n";
      $curDate = date("H:i:s");
      echo 'data: ' . $curDate;
      echo "\n\n";
    
      // Send a simple message at random intervals.
    
     
    
      
    
      ob_end_flush();
      flush();
    
      // Break the loop if the client aborted the connection (closed the page)
    
      if (connection_aborted()) break;
    
      sleep(1);
    }
});
Route::get('websocket/{msg}', function ($msg){
    // die($msg);

    broadcast(new SendMessageWebSocketEvent($msg));
   
    return "safe";
    
});
Route::get("milagre", function(){
    return view("milagre");
});
Route::get('/', function () {
    return view('teste');
});
Route::get('/teste', [Teste::class, 'toEmail']);

Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
