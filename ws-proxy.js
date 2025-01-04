const WebSocket = require('ws');

// Define the target WebSocket server
const target = 'ws://randomx.asia.mine.zergpool.com:4453'; // Replace with your target server URL

// Start WebSocket proxy server
const server = new WebSocket.Server({ port: process.env.PORT || 8080 });

server.on('connection', (client) => {
    console.log('New client connected');

    // Connect to the target server
    const targetConnection = new WebSocket(target);

    client.on('message', (message) => {
        console.log(`Message from client: ${message}`);
        targetConnection.send(message); // Forward to target
    });

    targetConnection.on('message', (message) => {
        console.log(`Message from target: ${message}`);
        client.send(message); // Forward to client
    });

    client.on('close', () => {
        console.log('Client disconnected');
        targetConnection.close();
    });

    targetConnection.on('close', () => {
        console.log('Target server disconnected');
        client.close();
    });
});

console.log('WebSocket proxy server is running...');
