/**************************************************
 * Configuring Employees Plugins
 **************************************************/
/**
 * Register Plugins
 */
exports.register = function(server, options, next) {
	
	server.route([
		
		{
			method : 'GET',
			path : '/employees',
			handler : function(request, reply) {
				console.log(request.getDb.toString());
				var events = request.getDb(request)('events');
				console.log(events.getModels())
				var event = events.getModel('Event');
				event.findAll({raw: true}).then(function(rows){
					console.log(rows)
					reply.view('employees/displayEmployees', {events:rows});
				})
			}
		},
		{
			method : 'POST',
			path : '/employees',
			handler : function(request, reply) {
				
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
	
	name : 'EmployeesModule',
	version : '1.0.0'	
};
