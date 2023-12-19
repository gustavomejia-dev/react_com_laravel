<?php
declare (strict_types=1);
namespace App\Http\Middleware;

use App\Models\Tenant;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckTenant
{

    public function __construct(
        private readonly Tenant $tenant
    ){

    }
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $hasAccess = session()->get('has_access');
        //se tiver acesso já libera o acesso
        if($hasAccess){
            return $next($request);
        }
        $tenant = $this->validTenancyExists($request);
        session()->put('tenant', $tenant);
        if(is_null($request->user())){
            return $next($request);
        }
        if(auth()->user()->tenant->id !== $tenant->id){
            auth()->logout();
            return redirect('/login')->with('no_access', true);
        }
        $subdomainUrl = subdomain_url($tenant->prefix_domain, '');
        config(['app_url' => $subdomainUrl]);
        $request->session()->put('has_access', true);
        return $next($request);


    }

    //verifica se o usuario é master, caso for tem acesso a tudo
    protected function validTenancyExists (Request $request): mixed{
        list($subdomain) = explode('.', $request->getHost(), 2);
        $tenant = $this->tenant->where('prefix_domain', $subdomain)->first();
        if($tenant === null){
            session()->put('is_master', true);

        }
        return $tenant;
    }
}
