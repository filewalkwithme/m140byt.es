/**
 * Module dependencies.
 */

var express = require('express')
  , nib = require('nib')
  , sio = require('socket.io');

/**
 * App.
 */

var app = express.createServer();

/**
 * App configuration.
 */

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

app.get('/client.js', function (req, res) {
  res.sendfile(__dirname + '/client.js');
});


/**
 * App listen.
 */

app.listen(3000, function () {
  var addr = app.address();
  console.log('   app listening on http://' + addr.address + ':' + addr.port);
});

/**
 * Socket.IO server (single process only)
 */

var io = sio.listen(app)
  , nicknames = {}, rooms = {}, idroom = 0;

io.sockets.on('connection', function (socket) {
  socket.on('user message', function (msg) {
    socket.broadcast.emit('user message', socket.nickname, msg);
  });

  socket.on('nickname', function (nick, fn) {
    if (nicknames[nick]) {
      fn(true);
    } else {
      fn(false);
      nicknames[nick] = socket.nickname = nick;
	  
	  /*Room management*/
	  if (!rooms[idroom]) { 
		rooms[idroom] = {}
	  }

	  if (rooms[idroom][0]){
	  	rooms[idroom][1] = nicknames[nick];
      	io.sockets.emit('room-ready', rooms[idroom][0] + ' x ' + rooms[idroom][1]);
	  	idroom++;
	  } else {
	  	rooms[idroom][0] = nicknames[nick];
	  }
	  /*end room management*/

      socket.broadcast.emit('announcement', nick + ' connected');
      io.sockets.emit('nicknames', nicknames);
    }
  });

  socket.on('disconnect', function () {
    if (!socket.nickname) return;

    delete nicknames[socket.nickname];
    socket.broadcast.emit('announcement', socket.nickname + ' disconnected');
    socket.broadcast.emit('nicknames', nicknames);
  });
});
