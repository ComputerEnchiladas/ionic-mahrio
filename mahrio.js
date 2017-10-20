process.env.NODE_URL='192.168.0.6';

require('mahrio').runServer( process.env, __dirname)
  .then( function(server){

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
        rep();
      },
      config: {
        cors: true
      }
    })
  });
