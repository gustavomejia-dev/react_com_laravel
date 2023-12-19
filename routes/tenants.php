<?php
declare(strict_types=1);



Route::group(array('domain' => "{subdomain}." . config('tenant.central_domain')), function (){
    Route::get('/', function($subdomain){
        return redirect(subdomain_url($subdomain, '/admin'));
    });


    Route::get('/login', function ($subdomain){
        session()->forget('tenant');
        return redirect(subdomain_url($subdomain, 'admin'));
    });



});
