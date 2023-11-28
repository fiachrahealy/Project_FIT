const server = require('./setup-server');

server.listen(process.env.SERVER_PORT);

console.log('Project FIT Server listening on port ' + process.env.SERVER_PORT);