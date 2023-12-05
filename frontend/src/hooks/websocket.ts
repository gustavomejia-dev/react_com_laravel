import Pusher from 'pusher-js'
import Echo from 'laravel-echo'

export const echo = new Echo({
    broadcaster: 'pusher',
    Pusher, // sets the instance imported above

    // Tweak the options according to your settings
    key: '52d1385c4ac2624763de', // set the key defined in your .env
    wsHost: 'ws-sa1.pusher.com', // the host defined in your .env
    wssHost: 'ws-sa1.pusher.com', // the host defined in your .env
    wsPort: 443, // or the port defined in your .env
    wssPort: 443, // or the port defined in your .env
    forceTLS: true,
    encrypted: false,
    cluster: 'sa1',
    enabledTransports: ['ws', 'wss'],
})

