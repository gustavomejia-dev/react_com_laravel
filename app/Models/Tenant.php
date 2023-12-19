<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Tenant extends Model
{
    use HasFactory;

    protected $fillable = [
        // 'plan_id',
        'name',
        'prefix_Domain',
        'logo',
        'is_active',


    ];
    public function user(): BelongsToMany {
        return $this->belongsToMany(User::class, 'tenant_id');
    }

    // public function setting():HasOne{
    //     return $this->hasOne(Setting:class);
    // }
}
