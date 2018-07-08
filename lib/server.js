/*
 * These are server related tasks
 * 
 */
 
// Dependencies
var http = require('http');
var url = require('url');
var StringDecoder = require('string_decoder').StringDecoder;
var handlers = require('./handlers');

// Instantiate the server module object
var server = {};

// Instantiate the http server
server.httpServer = http.createServer(function(req,res){
     server.anyRequest(req,res);
});

// All the server logic for both the http and https server
server.anyRequest = function(req,res){
     console.log('Server reached');

     // Get the URL and parse it
     var parsedURL = url.parse(req.url,true);

     // Get the path
     var path = parsedURL.pathname;
     var trimmedPath = path.replace(/^\/+|\/+$/g,'');

     // Get query string as object
     var queryStringObject = parsedURL.query;

     // Get the HTTP method
     var method = req.method.toLowerCase();

     // Get the headers as an object
     var headers = req.headers;

     //Get the payload if there is any
     var decoder = new StringDecoder('utf-8');
     var buffer = '';
     req.on('data',function(data){
          buffer += decoder.write(data);
     });
     
     req.on('end', function(){

          // Choose the handler this request should go to. If one is not found use the not found handler.
          var chosenHandler = typeof(server.router[trimmedPath]) !== 'undefined' ? server.router[trimmedPath] : handlers.notFound;

          // Route the request to the handler specified in the router
          chosenHandler(function(statusCode,payload){
               
               // use the status code called back by the handler, or defualt to 200
               statusCode = typeof(statusCode) == 'number' ? statusCode : 200;
               // use the payload called back by the handler, or default to an empty object
               payload = typeof(payload) == 'object' ? payload : {};

               // Convert payload to String
               var payloadString = JSON.stringify(payload);

               // Return the response
               res.setHeader('Content-Type','application/json');
               res.writeHead(statusCode);

               // Send the response
               res.end(payloadString);

               // Log the request path
               console.log('Returning this response: ',statusCode, payloadString);
          });
     });
};

// Define a request router
server.router = {
     'hello': handlers.hello
};

//Init script
server.init = function(){
     // Start the http server
     server.httpServer.listen(3000,function(){
          console.log('The server is listening on port: '+3000);
     });
};

server.close = function(){
     // Stop the http server
     server.httpServer.close();
};
// Export the module
module.exports = server;