import { config } from 'dotenv';
config();

import http from 'http';
import dbConnection from './connection.js';
import app from './app.js';

// Connect to MongoDB
dbConnection();

//creating server
const server = http.createServer(app);

// Start the server
const PORT = process.env.PORT || 8001;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});