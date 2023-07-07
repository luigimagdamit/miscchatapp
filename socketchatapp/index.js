const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io")
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3001"
      }
})

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('a user connected')
    // socket.on('chat message', (msg) => {
    //     console.log(msg)
    //     io.emit('chat message', (`${socket.id} says: ` + msg))
    // })
    socket.on('chat message object', (msg) => {
        console.log(msg)
        io.emit('chat message object', (msg))
    })
    socket.on('typing', (username) => {
        io.emit('typing', `${username} is typing...`)
    })
    socket.on('disconnect', () => {
        console.log('a user disconnected')
        io.emit('chat message', (`${socket.id} user has disconnected`))
    })
})

server.listen(3000, () => {
    console.log('listening on *:3000')
})