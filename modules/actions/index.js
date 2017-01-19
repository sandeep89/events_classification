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
            path: '/actions',
            handler: function(request, reply) {
                var events = request.getDb(request)('events');
                var action = events.getModel('Action');
                var actionData = request.payload;
                if (actionData.name) {
                    action.create(actionData).then(function(action) {
                        action.get({
                            plain: true
                        })
                        reply(action)
                    })
                } else {
                    reply(new Error("Invalid action data "))
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

    name: 'ActionsModule',
    version: '1.0.0'
};
