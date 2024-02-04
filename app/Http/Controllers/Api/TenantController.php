<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\TenantRequest;
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
    public function store(TenantRequest $request)
    {   
        // DB::enableQueryLog();
        /* Criar a validação dos dados */
        $result = '';
        $validated = $request->validated();
        $tenant = Tenant::create($request);
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
