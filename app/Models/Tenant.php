<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Stancl\Tenancy\Database\Models\Tenant as BaseTenant;
use Stancl\Tenancy\Contracts\TenantWithDatabase;
use Stancl\Tenancy\Database\Concerns\HasDatabase;
use Stancl\Tenancy\Database\Concerns\HasDomains;

class Tenant extends BaseTenant implements TenantWithDatabase
{
    use HasDatabase, HasDomains;



    // public function user () : HasMany{
    //     return $this->hasMany(User::class);
    // }
    protected $fillable = [
                'id',
                'cnpj', 
                'razao_social', 
                'nome_fantasia',
                'plano', 
                'status', 
                'usu_id_alteracao',
                'usu_id_cadastro',
                'data',
    ];
    public function user () : HasOne{
        return $this->hasOne(Product::class);
    }
}