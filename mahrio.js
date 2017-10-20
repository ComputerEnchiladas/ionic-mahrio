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
  });
