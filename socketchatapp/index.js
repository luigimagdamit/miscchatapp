const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io")
const io = new Server(server, {
    cors: {
        origin: "*"
      }
})

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('a user connected')
    io.emit('chat message object', {
        author: "Server",
        content: `User ${socket.id} has connected`,
        id: "Server Message"
    })
    // RECEIVING A CHAT MESSAGE SIGNAL
    socket.on('chat message object', (msg) => {
        console.log(msg)
        io.emit('chat message object', (msg))
    })
    socket.on('typing', (username) => {
        io.emit('typing', `${username} is typing...`)
    })
    socket.on('disconnect', () => {
        console.log('a user disconnected')
        io.emit('chat message object', {
            author: "Server",
            content: `${socket.id} user has disconnected`,
            id: "Server Message"
        })
    })
})

server.listen(3000, () => {
    console.log('listening on *:3000')
})