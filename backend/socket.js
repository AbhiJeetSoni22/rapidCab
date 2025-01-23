import { Server } from 'socket.io';
import { User } from './models/user.model.js';
import { Captain } from './models/captain.model.js';

let io;
const connectedSockets = new Map();

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

    io.on('connection', (socket) => {
        console.log('Client connected:', socket.id);

        socket.on('join', async (data) => {
            console.log('Join event:', data);
            try {
                if (data.userType === 'captain') {
                    await Captain.findByIdAndUpdate(data.userId, { socketId: socket.id });
                    console.log('Captain socket ID updated:', socket.id);
                } else {
                    await User.findByIdAndUpdate(data.userId, { socketId: socket.id });
                    console.log('User socket ID updated:', socket.id);
                }
                connectedSockets.set(data.userId, socket.id);
            } catch (error) {
                console.error('Error updating socket ID:', error);
            }
        });

        socket.on('update-location-captain', async (data)=>{
            const { userId, location } = data;
            if(!location || !location.lat || !location.lng){
                return socket.emit('error',{message: 'Invalid location'})
            }
            const updatedCaptain = await Captain.findByIdAndUpdate(
                userId,
                {
                    $set: {
                        location: {
                            lat: location.lat,
                            lng: location.lng
                        }
                    }
                },
                { new: true }
            );
    
           
           
           
        })

        socket.on('disconnect', () => {
            console.log('Client disconnected:', socket.id);
            // Remove from connected sockets
            for (const [userId, socketId] of connectedSockets.entries()) {
                if (socketId === socket.id) {
                    connectedSockets.delete(userId);
                    break;
                }
            }
        });
    });

    return io;
};

export const sendMessageToSocketId = (socketId, { event, data }) => {
    if (!io) {
        console.error('Socket.io not initialized');
        return;
    }
    console.log(`Emitting ${event} to socket ${socketId}:`, data);
    io.to(socketId).emit(event, data);
};