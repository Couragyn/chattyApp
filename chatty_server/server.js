// server.js
require('dotenv').config();

const express = require('express');
const SocketServer = require('ws').Server;
const uuidV1 = require('uuid/v1');
const WebSocket = require('ws')

// Set the port to 3001
const PORT = process.env.PORT || 3001;

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
  // Whenever a message comes to the server from a client, call this function
  let userCount = {
    type: "count",
    size: wss.clients.size
  }
  wss.broadcast(JSON.stringify(userCount));

  ws.on('message', (data) => {

    message = JSON.parse(data);
    let uuid = uuidV1();
    switch(message.type) {
      case "postMessage":
        let returnMessage = {
          type: "incommingMessage",
          id: uuid,
          username: message.username,
          content: message.content,
          color: message.color
        }
        wss.broadcast(JSON.stringify(returnMessage));
        break;
      case "postNotification":
        let returnNotification = {
          type: "incommingNotification",
          id: uuid,
          notificaton: `${message.oldUsername} has changed their name to ${message.newUsername}.`
        }
        wss.broadcast(JSON.stringify(returnNotification));
        break;
      default:
        throw new Error("Unknown event type " + message.type);
    }
  });
  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    let userCount = {
      type: "count",
      size: wss.clients.size
    }
    wss.broadcast(JSON.stringify(userCount));
    console.log('Client disconnected')
  });
});
