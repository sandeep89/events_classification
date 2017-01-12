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
			path: '/products',
			handler: function(request, reply) {
				var events = request.getDb(request)('events');
				var product = events.getModel('Product');
				var productData = request.payload;
				if (productData.name) {
					product.create(productData).then(function(product) {
						product.get({
							plain: true
						})
						reply(product)
					})
				} else {
					reply(new Error("Invalid product data "))
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

	name: 'ProductsModule',
	version: '1.0.0'
};
