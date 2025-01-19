import { config } from 'dotenv';
config();

import http from 'http';
import cluster from 'cluster';
import os from 'os';
import dbConnection from './connection.js';
import app from './app.js';
import { initializeSocket } from './socket.js';

const PORT = process.env.PORT || 8001;

// Check if the current process is the master process
if (cluster.isPrimary) {
  const numCPUs = os.cpus().length;

  console.log(`Master process is running (PID: ${process.pid})`);
  console.log(`Forking server for ${numCPUs} CPUs...`);

  // Fork workers
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  // Handle worker exits
  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} exited. Code: ${code}, Signal: ${signal}`);
    console.log('Starting a new worker...');
    cluster.fork(); // Restart a new worker
  });
} else {
  // Workers will run the server
  console.log(`Worker process started (PID: ${process.pid})`);

  // Connect to MongoDB
  dbConnection();

  // Create server
  const server = http.createServer(app);

  // Initialize Socket.io
  initializeSocket(server);

  // Start the server
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} (PID: ${process.pid})`);
  });
}
