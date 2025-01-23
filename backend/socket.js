import { Server } from 'socket.io';
import { User } from './models/user.model.js';
import { Captain } from './models/captain.model.js';

let io;

export const initializeSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: ['https://rapidcab-frontend.onrender.com'],
            methods: ["GET", "POST", "PUT", "DELETE"],
            credentials: true,
            allowedHeaders: ["Content-Type", "Authorization"]
        },
        transports: ["websocket", "polling"],
        path: "/socket.io/",
        pingTimeout: 60000,
        pingInterval: 25000
    });

    io.on('connection', async (socket) => {
        console.log('Client connected:', socket.id);

        socket.on('join', async (data) => {
            try {
                if (data.userType === 'captain') {
                    await Captain.findByIdAndUpdate(data.userId, { socketId: socket.id });
                    console.log('Captain socket ID updated:', socket.id);
                } else {
                    await User.findByIdAndUpdate(data.userId, { socketId: socket.id });
                    console.log('User socket ID updated:', socket.id);
                }
            } catch (error) {
                console.error('Error updating socket ID:', error);
            }
        });

        socket.on('disconnect', () => {
            console.log('Client disconnected:', socket.id);
        });
    });

    return io;
};