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
				var product = events.getModel('Product');
				var noProductSelected = false;
				var query = {};
				if (request.query.product &&
					request.query.product != 'all') {
					query = {
						product_id: parseInt(request.query.product)
					}
				}else{
					noProductSelected = true;
				}
				async.parallel([
					function(cb) {
						product.findAll({
							raw: true
						}).then(function(products) {
							products.forEach(function(product) {
								if (product.id == request.query.product) {
									product.selected = true
								}
							})
							return cb(null, products);
						});
					},
					function(cb) {
						event.findAll({
							where: query,
							raw: true
						}).then(function(eventData) {
							return cb(null, eventData);
						})
					}
				], function(err, result){
					reply.view('events/displayEvents', {
						products: result[0],
						events: result[1],
						noProductSelected: noProductSelected
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
				if (eventData.name && eventData.product_id) {
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
				var product = events.getModel('Product');
                var action = events.getModel('Action');
                var object = events.getModel('Object');
				async.parallel([
					function(cb) {
						product.findAll({
							raw: true
						}).then(function(products) {
							return cb(null, products);
						})
					},
					function(cb) {
						event.findAll({
							raw: true
						}).then(function(events) {
							return cb(null, events);
						});
					},
                    function(cb) {
                        action.findAll({
                            raw: true
                        }).then(function(actions) {
                            return cb(null, actions);
                        });
                    },
                    function(cb) {
                        object.findAll({
                            raw: true
                        }).then(function(objects) {
                            return cb(null, objects);
                        });
                    },
					function(cb) {
						event.findById(request.params.eventId).then(function(events) {
							return cb(null, events)
						});
					}
				], function(err, result) {
					if (err) reply(err);
					reply.view('events/displayEvents', {
						products: result[0],
						events: result[1],
                        actions: result[2],
                        objects: result[3],
						event: result[4]
					});
				});
			}

		},{
			method: 'POST',
			path: '/events/save',
			handler: function(request, reply) {
				console.log("here");
				var events = request.getDb(request)('events');
				var eventlist = events.getModel('EventList');
				var eventData = request.payload;
				console.log(eventData, eventlist);
				if (eventData.object_name && eventData.platform_name && eventData.actor_name && eventData.action_name) {
					console.log(eventData);
					eventlist.create(eventData).then(function(eventlist) {
						console.log()
						eventlist.get({
							plain: true
						})
						reply(eventlist)
					}).catch(function(err){
						console.log(err);
						reply(err);
					})
				} else {
					reply(new Error("Invalid Event data"))
				}
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
