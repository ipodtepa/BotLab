var restify = require('restify');
var builder = require('botbuilder');

var http = require('http');

// Setup Restify Server
var server = restify.createServer();

function respond(req, res, next) {
    res.send('hello ' + req.params.name);
    next();
  }

server.listen(process.env.port || process.env.PORT || 3982, function () {
   console.log('%s listening to %s', server.name, server.url); 
});

// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
    appId: process.env.MicrosoftAppId,
    appPassword: process.env.MicrosoftAppPassword
});

// Listen for messages from users 
server.post('/api/messages', connector.listen());

// Listen for messages from users 
//server.get('/test', connector.listen());
//server.post('/hello/:name', respond);
server.post('/hello/:name', connector.listen());


// Receive messages from the user and respond by echoing each message back (prefixed with 'You said:')
var bot = new builder.UniversalBot(connector, function (session) {
    session.send("You said: %s", session.message.text);
});


//create a server object:
http.createServer(function (req, res) {
    res.write('Hello World!'); //write a response to the client
    res.end(); //end the response
  }).listen(81); //the server object listens on port 8080