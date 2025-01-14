import { Server } from 'socket.io';
import { User } from './models/user.model.js';
import { Captain } from './models/captain.model.js';


let io;
const connectedSockets = new Map();

export const initializeSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });

    io.on('connection', (socket) => {
        console.log('A user connected:', socket.id);

        socket.on('join',async (data)=>{
            const {userId, userType}= data;
            if(userType === 'user'){

                await User.findByIdAndUpdate(userId,{socketId:socket.id
                })
            }
            else if(userType === 'captain'){
                await Captain.findByIdAndUpdate(userId,{
                    socketId:socket.id
                })
            }
        })

        socket.on('update-location-captain', async (data)=>{
            const { userId, location } = data;
            if(!location || !location.ltd || !location.lng){
                return socket.emit('error',{message: 'Invalid location'})
            }
             await Captain.findByIdAndUpdate(userId,{location:{
                ltd:location.ltd,
                lng:location.lng
             }})
        })

        socket.on('register', (userId) => {
            connectedSockets.set(userId, socket.id);
            console.log(`User ${userId} registered with socket ${socket.id}`);
        });

        socket.on('disconnect', () => {
            // Remove socket from connectedSockets
            for (let [userId, socketId] of connectedSockets.entries()) {
                if (socketId === socket.id) {
                    connectedSockets.delete(userId);
                    console.log(`User ${userId} disconnected`);
                    break;
                }
            }
        });
    });

    return io;
};

export const sendMessageToSocketId = (userId, event, data) => {
    if (!io) {
        console.log('Socket.io not initialized');
        return;
    }

    const socketId = connectedSockets.get(userId);
    if (socketId) {
        io.to(socketId).emit(event, data);
    } else {
        console.log(`No socket found for user ${userId}`);
    }
};