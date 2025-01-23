import { config } from 'dotenv';
config();

import http from 'http';
import cluster from 'cluster';
import os from 'os';
import dbConnection from './connection.js';
import app from './app.js';
import { initializeSocket } from './socket.js';
import { createAdapter } from '@socket.io/redis-adapter';
import { createClient } from 'redis';

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
    console.log(`Worker ${worker.process.pid} died`);
    cluster.fork();
  });
} else {
  // Workers will run the server
  console.log(`Worker process started (PID: ${process.pid})`);

  // Create server
  const server = http.createServer(app);

  // Initialize Socket.io first
  const io = initializeSocket(server);

  // Redis setup for socket.io
  const pubClient = createClient({ url: process.env.REDIS_URL });
  const subClient = pubClient.duplicate();

  Promise.all([pubClient.connect(), subClient.connect()]).then(() => {
    if (io) {
      io.adapter(createAdapter(pubClient, subClient));
      console.log('Socket.IO Redis adapter connected');
    }
  }).catch(error => {
    console.error('Redis connection error:', error);
  });

  // Connect to MongoDB and start the server
  dbConnection().then(() => {
    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT} (PID: ${process.pid})`);
    });
  });
}
