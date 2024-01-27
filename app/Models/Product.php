<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Product extends Model
{

    
    use HasFactory;
    protected $with = ['tenant'];
    protected $fillable = ['name','tipo', 'qtd', 'status', 'tenant_id'];

    public function tenant() : BelongsTo {
        return $this->belongsTo(Tenant::class);
    }

}
