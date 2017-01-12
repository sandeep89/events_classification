var Hapi = require('hapi');
var server = new Hapi.Server();
var Good = require('good');
var Path = require('path');
var Sequelize = require('sequelize');

var config = {
      host: '127.0.0.1',
      port: 3306,
      dialect: 'mysql',
      username: 'root',
      password: 'password',
      database: 'events'
    }
/**
 * Lets the server run on this Host and Port
 */
server.connection({host:'127.0.0.1',port:3000});


var  sequelize = new Sequelize('events', 'root', 'password', {
  host: '127.0.0.1',
  port: 3306,
  dialect: 'mysql'
});

/**
 * Routing Static Pages [JS, Css, Images, etc]
 */
server.register(require('inert'), function(err) {
	
	if (err) {
		
		throw err;
	}
	
	server.route({
		method : 'GET', path : '/public/{path*}', handler : {
			directory : {
				path : './public',
				listing : false,
				index : false
			}
		}
	});
	
});


/**
 * Register all Modules eas Plugins Here
 * 
 */

var plugins = [
	
	{ register : require('vision') }, //register Vision with others Plugins
	{ register : require('./modules/events/index.js') }
	
];

/**
 * Routing Views
 */ 
server.register(plugins, function (err) {

    if (err) {
        throw err;
    }

    server.views({
		
        engines: { html: require('handlebars') },
		layout : true,
        path: __dirname + '/views',
		layoutPath : Path.join(__dirname, './views/layouts'), //setting Global Layout,
		partialsPath : Path.join(__dirname,'./views/layouts/partial') //partial Views
    });
	
	/**
	 * Default route
	 */
    server.route({ method: 'GET', path: '/', handler: function(request, reply) {
		
		var events = request.getDb(request)('events');
				var event = events.getModel('Event');
				event.findAll({raw: true}).then(function(rows){
					reply.view('home/home', {title : 'Home', 'events':rows});
				})
		
	} });
});




/**
 * running Http Node Server with Good Plugins for Logging  
 */
server.register({
	
	register : Good,
	options : {
		
		reporters : [{
			reporter : require('good-console'),
			events : {
				
				response : '*',
				log:'*'
			}
		}]
	}
	
}, function(error) {
	
	if(error) {
		
		throw error;
	}
	
	/**
	 * Starting Server
	 */
	server.start(function(){
	
		console.log("Server running on", server.info.uri);
	});
	
});

server.register(
  {
      register: require('hapi-sequelize'),
      options:
        {
          name: 'events', // identifier
          models: ['./models/*.js'],  // paths/globs to model files
          sequelize: sequelize, // sequelize instance
          sync: true, // sync models - default false
          forceSync: false // force sync (drops tables) - default false
        }
  }, function(err){
  	console.log(err)
  });
 
