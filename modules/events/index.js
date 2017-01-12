/**************************************************
 * Configuring Events Plugins
 **************************************************/
/**
 * Register Plugins
 */
var async = require('async');
exports.register = function(server, options, next) {

	server.route([

		{
			method: 'GET',
			path: '/events',
			handler: function(request, reply) {
				var events = request.getDb(request)('events');
				var event = events.getModel('Event');
				event.findAll({
					raw: true
				}).then(function(rows) {
					reply.view('events/displayEvents', {
						events: rows
					});
				})
			}
		}, {
			method: 'POST',
			path: '/events',
			handler: function(request, reply) {
				var events = request.getDb(request)('events');
				var event = events.getModel('Event');
				var eventData = request.payload;
				if (eventData.name && eventData.product) {
					event.create(eventData).then(function(event) {
						event.get({
							plain: true
						})
						reply(event)
					})
				} else {
					reply(new Error("Invalid Event data "))
				}
			}
		}, {
			method: 'GET',
			path: '/event/{eventId}',
			handler: function(request, reply) {
				var events = request.getDb(request)('events');
				var event = events.getModel('Event');
				async.parallel([
					function(cb) {
						event.findAll({
							raw: true
						}).then(function(event){
							return cb(null, event);
						});
					},
					function(cb) {
						event.findById(request.params.eventId).then(function(events){
							return cb(null, events)
						});
					}
				], function(err, result) {
					if(err) reply(err);
					reply.view('events/displayEvents', {
						events: result[0],
						event: result[1]
					});
				});
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

	name: 'EventsModule',
	version: '1.0.0'
};
