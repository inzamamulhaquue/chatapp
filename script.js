const socket = io()

//Connect to Server
socket.on('connect', () => {
    console.log('Connected ' + socket.id)
});

//Message received
socket.on('chat_rcvd', (data) => {
    $('#chats').append(
        $('<li>').text(
            `${data.username}: ${data.msg}`
        )
    );
});

$(() => {
    $('#chatbox').hide();

    //Login button clicked
    $('#login').click(() => {
        socket.emit('login', {
            username: $('#username').val()
        });
    });

    //Login Successfully
    socket.on('loggedin', () => {
        console.log('Login successful');
        $('#loginform').hide()
        $('#chatbox').show()
    });

    //Send button clicked
    $('#send').click(() => {
        console.log('Sending chat');
        const messageInput = $('#msg');
        socket.emit('chat', {msg: $('#msg').val()})

          // Clear message input box
          messageInput.val('');
    });
});