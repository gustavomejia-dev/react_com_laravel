<?php

namespace App\Http\Controllers\Api;

use App\Events\SendMessageWebSocketEvent;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\ProductRequest;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

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
    public function store(ProductRequest $request)
    {   

        
        // $id = auth()->user()->tenant_id;
        // return $id;
        $dadosValidados= $request->validated();
        // return Auth::user()->tenant_id;
        // Product::create($dadosValidados);
        // return $dadosValidados;
        // return $dadosValidados;
            
       
    
        if($dadosValidados){
            
            Product::create([
                // 'tenant_id'=> 'Gustavo',
                'nome' => 'Teclado',
                'preco' => '1000',
                'tipo' => '1',
                'qtd' => '50',
                'status'=> 'A'
            ]);
            broadcast(new SendMessageWebSocketEvent());
            
           
        }
        return response()->json($dadosValidados, 200);

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
