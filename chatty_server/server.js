// server.js

const express = require('express');
const SocketServer = require('ws').Server;
const uuidV1 = require('uuid/v1');
const WebSocket = require('ws')

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

wss.broadcast = function broadcast(data) {
  // Loop over each of the clients that the server is keeping track of
  wss.clients.forEach((client) => {
    // If the client is still ready to receive messages
    if (client.readyState === WebSocket.OPEN) {
      // Send the data to the client. This will trigger a MessageEvent on the client
      client.send(data);
    }
  });
};


// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('new connection');
  // Whenever a message comes to the server from a client, call this function
  ws.on('message', (data) => {
    message = JSON.parse(data);

    let uuid = uuidV1();
    let returnMessage = {
      id: uuid,
      username: message.username,
      content: message.content
    }
    wss.broadcast(JSON.stringify(returnMessage));
  });
  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => console.log('Client disconnected'));
});
