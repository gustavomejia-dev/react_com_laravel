<?php

namespace App\Console;

use App\Jobs\CleanCodeForgetPasswordJob;
use App\Jobs\SendEmailJob;
use App\Models\UserForgotPassword;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * Define the application's command schedule.
     */
    protected function schedule(Schedule $schedule): void
    {
        // info('sendNotification');
        // $schedule->job(new SendEmailJob)->everyMinute();
        $schedule->call(function ()  {
            UserForgotPassword::where("id", "!=", 0)->delete();
        })->everyMinute();
    }

    /**
     * Register the commands for the application.
     */
    protected function commands(): void
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }
}
