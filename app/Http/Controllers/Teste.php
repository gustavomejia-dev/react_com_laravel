<?php

namespace App\Http\Controllers;

use App\Mail\Qualquer;
use App\Mail\TesteMarkdown;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class Teste extends Controller
{

    public function toEmail(){
        // return view('mailteste');
         $name = 'gustavo_mejia@outlook.com.br';
         $send =  Mail::to($name, 'Gustavo')->send(new TesteMarkdown(
            [
                'fromName' => 'Gustavo',
                'fromEmail' => 'gustavin_mejia@hotmail.com',
                'subject' => 'teste',
            ]
      ));

      var_dump($send);
    }
}
