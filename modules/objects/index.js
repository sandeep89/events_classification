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
            method: 'POST',
            path: '/objects',
            handler: function(request, reply) {
                var events = request.getDb(request)('events');
                var object = events.getModel('Object');
                var objectData = request.payload;
                if (objectData.name) {
                    object.create(objectData).then(function(object) {
                        object.get({
                            plain: true
                        })
                        reply(object)
                    })
                } else {
                    reply(new Error("Invalid object data "))
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

    name: 'ObjectsModule',
    version: '1.0.0'
};
