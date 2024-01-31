<?php

namespace App\Http\Controllers\Api;

use App\Events\SendMessageWebSocketEvent;
use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {   


        $dadosValidados = $request->validate(
        [   
            'filter.name' => ['required'],
            'filter.tipo' => ['required'],
            'filter.qtd' => ['required'],
            'filter.status' => ['required'],
            'tenant_id' => ['required'],
            'user_id' => ['required']
        ]
            
        );
    
        if($dadosValidados){
            Product::create($dadosValidados);
            broadcast(new SendMessageWebSocketEvent());
            return true;
           
        }
        

    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
