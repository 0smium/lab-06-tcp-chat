'use strict';

const net = require('net'); //built in to Node

const server =  net.createServer();

server.listen(3000, () => {
  console.log('server running on port 3000');
});
