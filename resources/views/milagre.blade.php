<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    @vite('resources/js/app.js')
    <title>Document</title>
</head>
<body>
    
</body>
<script>
    window.addEventListener('load',  () =>{
        console.table(window.Echo);

        Echo.channel('public-channel')

        // Listen for the event called "button.clicked"
        .listen('.SendMessageWebsocketEvent', (e) => {
            
            // Display the "message" in an alert box
            alert(e.message);
            console.log('oi');
        });
        
    })
</script>
</html>