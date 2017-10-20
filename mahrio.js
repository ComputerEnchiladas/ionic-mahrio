process.env.NODE_URL='192.168.0.6';
process.env.NODE_PUBLIC_PATH='./';


var five = require('johnny-five');
var pixel = require('node-pixel');

var board = new five.Board({});

board.on("ready", function() {

    console.log("Board ready, lets add light");
    var strip = new pixel.Strip({
        data: 6,
        length: 5,
        color_order: pixel.COLOR_ORDER.GRB,
        board: this,
        controller: "FIRMATA",
    });

    strip.on("ready", function() {

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
                var c = req.payload;
                console.log('rgb('+c.red+','+c.green+','+c.blue+')');
                io.sockets.emit('color', c);
                strip.color('rgb('+c.red+','+c.green+','+c.blue+')' );
                strip.show();
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
    });
});
