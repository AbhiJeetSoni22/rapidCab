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

        socket.on('register', (userId) => {
            connectedSockets.set(userId, socket.id);
            
        });

        socket.on('disconnect', () => {
            // Remove socket from connectedSockets
            for (let [userId, socketId] of connectedSockets.entries()) {
                if (socketId === socket.id) {
                    connectedSockets.delete(userId);
                    break;
                }
            }
        });
    });

    return io;
};

export const sendMessageToSocketId = (socketId, message) => {
    try {
      io.to(socketId).emit(message.event, message.data);
    } catch (error) {
      console.error('Error emitting event to socket:', error);
    }
};