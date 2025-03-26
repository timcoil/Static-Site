const liveServer = require('live-server');
const path = require('path');

// Configure paths
const buildDir = path.join(__dirname, '../build');

// Start live-server
const serverParams = {
  port: 8080,
  root: buildDir,
  open: true,
  file: 'index.html',
  wait: 1000,
  logLevel: 2
};

console.log('Starting server on http://localhost:8080');
liveServer.start(serverParams); 