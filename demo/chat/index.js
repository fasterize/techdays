var static = require('node-static')
    , http = require('http');

var clientFiles = new static.Server('./client');

var httpServer = http.createServer(function(request, response) {
        request.on('end', function () { clientFiles.serve(request, response); });
        });

var io = require('socket.io').listen(httpServer);

io.sockets.on('connection', function(socket) {
    console.log('client connected');
    socket.emit('message','Please enter a user name ...');

    var userName;
    socket.on('message', function(message) {
        if(!userName) {
            userName = message;
            socket.broadcast.emit('message',message + ' has entered the zone.');
            return;
        }

        var broadcastMessage = userName + ': ' + message;
        socket.broadcast.emit('message',broadcastMessage);
    });

    socket.on('disconnect', function() {
        var broadcastMessage = userName + ' has left the zone.';
        socket.broadcast.emit('message', broadcastMessage);
    });
});

httpServer.listen(2000);
