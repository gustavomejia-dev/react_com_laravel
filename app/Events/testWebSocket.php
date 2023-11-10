<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class testWebSocket
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * Create a new event instance.
     * 
     */
    private $msg;
    public function __construct($msg)
    {   
        $this->msg = $msg;
        
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    // public function fds(){

    //     return 'fds o ' . $this->msg;
    // }
    public function broadCastWith(){
        
        return response()->json(['mensagem', $this->msg],200);
    }
    public function broadCastAs()
    {
        return 'testWebSocket';
    }    
    public function broadcastOn(): array
    {
        return [
            new Channel('orderStatus'),
        ];
    }
}
