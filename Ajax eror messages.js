$(document).ready(function(){
    var socket = io();
    $(".sign_up_form").submit(function(event){
        //event.preventDefault();
            socket.on('message-sign', (data) => {
              $(".error_server").text(data);
            });

            socket.on('message-login', (data) => {
                $(".error_login").text(data);
            });
    });
});

