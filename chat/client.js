      var socket = io.connect();
      socket.on('user message', message);

      function message (from, msg) {
        $('#lines').append($('<p>').append($('<b>').text(from), msg));
      }

      socket.on('room-ready', function (msg) {
        $('#room').append($('<p>').append($('<em>').text(msg)));
      });

      // dom manipulation
      $(function () {
        $('#set-nickname').submit(function (ev) {
          socket.emit('nickname', $('#nick').val(), function (set) {});
          return false;
        });

        $('#send-message').submit(function () {
          message('Me: ', $('#message').val());
          socket.emit('user message', $('#message').val());
          return false;
        });
      });


