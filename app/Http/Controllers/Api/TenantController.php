<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Tenant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TenantController extends Controller
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
        // DB::enableQueryLog();
        /* Criar a validação dos dados */
        $result = '';
        // return Tenant::all();
        // return $request->emp_cnpj;
        $tenant = Tenant::create(
            [   
                'id' => $request->id,
                'cnpj' =>  $request->cnpj,
                'razao_social' => $request->razao_social,
                'nome_fantasia' => $request->nome_fantasia,
                'plano' => $request->plano,
                'status' => $request->status,
                'usu_id_alteracao' => $request->usu_id,
                'usu_id_cadastro' => $request->usu_cadastro
                
            ]
        );
        // dd(DB::getQueryLog());
        $tenant->domains()
                        ->create(
                                    [
                                        'domain' => $request->emp_domain
                                    ]
                                ) ? $result = true: $result = false;
        return response()->json($result, 200);                       

    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
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

    public function isTenantExist(Request $request){
        // return 'aqui';
        
        $tenant = Tenant::find($request->domain);
        // $status = 500;
        $tenant ? $status = 200 : $status = 500;
        return response()->json($tenant, $status);
    }
    public function isDomainExist(string $tenant){
        
    }
}
