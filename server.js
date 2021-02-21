const express = require('express')
const app = express()

const server = require('http').Server(app);
// const io = require('socket.io')(server);

const io = require("socket.io")(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        credentials: true
    }
});

app.use(express.json())

const rooms = new Map()

app.get('/rooms', (req, res) => {
    res.json(rooms)
})
app.post('/rooms', (req, res) => {
    const {roomId, userName} = req.body
    if (!rooms.has(roomId)) {
        rooms.set(
            roomId,
            new Map([
                    ['users', new Map()],
                    ['messages', []]
                ]
            ))
    }
    res.send()
})

io.on('connection', socket => {
    console.log('user connected', socket.id)
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
})

server.listen(9999, (err) => {
        if (err) {
            console.log('sss')
            throw Error(err)
        }
        console.log('Server started')
    }
)