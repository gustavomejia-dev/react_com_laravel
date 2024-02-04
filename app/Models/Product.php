<?php

namespace App\Models;

use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Contracts\Database\Query\Builder as QueryBuilder;
use Illuminate\Database\Eloquent\Builder as EloquentBuilder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Auth;

class Product extends Model
{

    
    use HasFactory;
    
   
    protected $fillable = ['nome', 'tenant_id', 'user_id','tipo', 'preco', 'qtd', 'status'];
    // protected $attributes = [
    //     'user_id' => '1',
      
    // ];
    public function tenant() : BelongsTo {
        return $this->belongsTo(Tenant::class);
    }

    protected static function boot(){
        parent::boot();
        self::creating(function ($model){
            $model->user_id = auth()->id();
            $model->tenant_id = auth()->user()->tenant_id;
        });


        self::addGlobalScope(function(EloquentBuilder $builder){
            $builder->where('user_id', auth()->id())->where('tenant_id', auth()->user()->tenant_id);
        });
    }
  

}
