/*
 *  Request Handlers
 *
 */

// Dependencies

// Define the handlers
var handlers = {};

// Not found handler
handlers.hello = function(callback){
          callback(200, {'message':'Hello World. This is my homework'});
};

// Not found handler
handlers.notFound = function(callback){
          callback(404)
};

// Export the module
module.exports = handlers;