<?php

namespace App\Jobs;

use App\Models\User;
use App\Notifications\SendEmailUsers;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\Middleware\RateLimited;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class SendNotificationJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     */
    public function __construct(public User $user)
    {
      
    }

    /**
     * Define um limitador que está definido la em \AppServiceProvider\ 
     *
     * @return  Array[]
     */
     public function middleware(){
        return[

            new RateLimited('notifications')
        ];
     }


    /**
     * Execute the job.
     */
    public function handle(): void
    {   
        $this->user->notify(new SendEmailUsers);
    }
}
