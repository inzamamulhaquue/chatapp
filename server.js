const express = require('express');
const http = require('http');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

let idUserMap = {}

io.on('connection', (socket) => {
    console.log('Connected ' + socket.id)

    socket.on('login', (data) => {
        idUserMap[socket.id] = data.username
        socket.emit('loggedin')
    })

    socket.on('chat', (data) => {
        io.emit('chat_rcvd', {
            username: idUserMap[socket.id],
            msg: data.msg
        });
    })

})

app.use('/', express.static(__dirname + '/src'));

server.listen(1010, () => {
    console.log('Server has started on http://localhost:1010')
});