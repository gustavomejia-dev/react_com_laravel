<?php

namespace App\Providers;

use App\Models\Product;
use App\Observers\UserObserver;
use Illuminate\Cache\RateLimiter as CacheLimiter;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Queue\Middleware\RateLimited;
use Illuminate\Support\ServiceProvider;
use PHPUnit\Event\Code\Test;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {   
        //
        RateLimiter::for('notifications', fn() => Limit::perMinute(4));
        // Product::observe(UserObserver::class);
    }
}
