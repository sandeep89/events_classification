/**************************************************
 * Configuring Events Plugins
 **************************************************/
/**
 * Register Plugins
 */
exports.register = function(server, options, next) {
	
	server.route([
		
		{
			method : 'GET',
			path : '/events',
			handler : function(request, reply) {
				var events = request.getDb(request)('events');
				var event = events.getModel('Event');
				event.findAll({raw: true}).then(function(rows){
					reply.view('events/displayEvents', {events:rows});
				})
			}
		},
		{
			method : 'POST',
			path : '/events',
			handler : function(request, reply) {
				
			}
		},
		{
			method : 'GET',
			path : '/event/{eventId}',
			handler : function(request, reply){
				var events = request.getDb(request)('events');
				var event = events.getModel('Event');
				event.findById(request.params.eventId).then(function(event){
					event = event.get({plain:true});
					reply.view('events/displayEvents', {event:event});
				})
			}

		}		
		
	]);
	
	next();
};

/**
 * Plugin attributes...
 * we have here the Name and the Version of the plugin
 */
exports.register.attributes = {
	
	name : 'EventsModule',
	version : '1.0.0'	
};
