process.env.NODE_URL='192.168.0.6';
process.env.NODE_PUBLIC_PATH='./';

require('mahrio').runServer( process.env, __dirname)
  .then( function(server){

    var io = require('socket.io').listen( server.listener );

    server.route({
      method: 'GET',
      path: '/',
      handler: function(req, rep){
        rep.view('index');
      }
    })

    server.route({
      method: 'POST',
      path: '/color',
      handler: function(req, rep){
        console.log('rgb('+req.payload.red+','+req.payload.green+','+req.payload.blue+')');
        io.sockets.emit('color', req.payload);
        rep();
      },
      config: {
        cors: true
      }
    })

    server.route({
      method: 'GET',
      path: '/socket-io-client',
      handler: function(req, rep) {
        rep.file('node_modules/socket.io-client/dist/socket.io.js');
      }
    })
  });
