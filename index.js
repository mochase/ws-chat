var app = require('express')()
var http = require('http').Server(app)
var io = require('socket.io')(http)

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html')
})

io.on('connection', function (ws) {
    console.log('a user connected')
    ws.on('disconnect', function () {
        console.log('user disconnected')
    })

    ws.on('chat message', function (msg) {
        console.log('message: ' + msg)
        ws.broadcast.emit('chat message', msg)
    })

    // 这里 io !== ws
    // io 表示socketio server, 而 ws 表示触发 'connection' 的 连接实例.
    // io.emit 会向整个 socketio 应用中的所有连接推送消息
    // ws.emit 则只会向当前连接推送消息
    // ws.broadcast.emit 则是向除自己之外的所有连接广播消息
})

http.listen(3000, function () {
    console.log('listening on 3000 port')
})