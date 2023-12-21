<?php

namespace App\Providers;

use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\Route;

class RouteServiceProvider extends ServiceProvider
{
    /**
     * The path to your application's "home" route.
     *
     * Typically, users are redirected here after authentication.
     *
     * @var string
     */
    public const HOME = '/dashboard';

    /**
     * Define your route model bindings, pattern filters, and other route configuration.
     */
    public function boot(): void
    {
        RateLimiter::for('api', function (Request $request) {
            return Limit::perMinute(60)->by($request->user()?->id ?: $request->ip());
        });

        $this->routes(function () {
            // $this->mapTenantRoutes();
            
            Route::middleware('api')
                ->prefix('api')
                ->group(base_path('routes/api.php'));

            Route::middleware('web')
                ->group(base_path('routes/web.php'));
        });
    }


    public function mapTenantRoutes(): void
    {

        Route::middleware('api')
        // ->domain($domain)
        ->domain(config('tenants.central_domain'))
        ->prefix('api')
        ->group(base_path('routes/api.php'));

        Route::middleware('web')
            ->domain(config('tenants.central_domain'))
            // ->domain($domain)
            ->group(base_path('routes/web.php'));

        Route::middleware('web')
            
            ->domain(config('tenants.central_domain'))
            ->group(base_path('routes/tenants.php'));

        // foreach($this->centralDomains() as $domain){
        //     Route::middleware('api')
        //     ->domain($domain)
        //     // ->domain(config('tenants.central_domain'))
        //     ->prefix('api')
        //     ->group(base_path('routes/api.php'));

        //     Route::middleware('web')
        //         // ->domain(config('tenants.central_domain'))
        //         ->domain($domain)
        //         ->group(base_path('routes/web.php'));

        //     Route::middleware('web')
                
        //         // ->domain(config('tenants.central_domain'))
        //         ->group(base_path('routes/tenants.php'));
        // }
        
    }


    protected function centralDomains(): array
        {
            return config('tenancy.central_domains');
        }
}
