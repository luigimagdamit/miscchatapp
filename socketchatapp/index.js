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
    // unique per socket connection but replace later with in message addresses
    const room1 = ([...socket.rooms].slice(1,))
    
    io.to(room1).emit('chat message object', {
        author: "Server",
        content: `User ${socket.id} has connected`,
        id: "Server Message"
    })
    socket.on('join room', (room) => {
        // INPUT IS STRING
        console.log(`a user connected to ${room}`)
        socket.join(room)
    })
    socket.on('leave room', (room) => {
        console.log(`a user disconnected from ${room}`)
        const serverMsg = {
            author: "Server",
            content: `User ${socket.id} has disconnected from ${room}`,
            id: "Server Message",
            channel: "#main",
            room: room
        }
        console.log(serverMsg)
        io.to(room).emit('chat message object', serverMsg)
        socket.leave(room)
        
    })
    // RECEIVING A CHAT MESSAGE SIGNAL
    socket.on('chat message object', (msg) => {
        console.log(msg)
        io.to(msg.room).emit('chat message object', (msg))
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