import { createRide, getFare,confirmRideService } from "../services/ride.service.js";
import { validationResult } from "express-validator";
import { getCaptainsInTheRadius} from "./maps.controller.js";
import { getAddressCoordinate } from "../services/maps.service.js";
import { sendMessageToSocketId } from "../socket.js";
import { Ride } from "../models/ride.model.js";


const createRideController = async (req, res) => {
  try {
    const { pickup, destination, vehicleType } = req.body;
    
    // Create ride first
    const ride = await createRide({ 
      user: req.user._id, 
      pickup, 
      destination, 
      vehicleType 
    });

    // Get coordinates
    const pickupCoordinates = await getAddressCoordinate(pickup);
    console.log('Pickup coordinates:', pickupCoordinates);

    if (!pickupCoordinates || !pickupCoordinates.lat || !pickupCoordinates.lng) {
      return res.status(400).json({ error: "Could not get coordinates for pickup location" });
    }

    // Send response first
    res.status(201).json({ 
      message: "Ride created successfully", 
      ride 
    });

    // Find available captains
    const availableCaptains = await getCaptainsInTheRadius(
     pickupCoordinates.lat, 
     pickupCoordinates.lng,
      2
    );
      const rideWithUser = await Ride.findById(ride._id).populate('user')
      // Notify available captains
      availableCaptains.forEach(captain => {
        if (captain.socketId) {
            console.log('Sending new ride to captain:', captain.socketId, rideWithUser);
            sendMessageToSocketId(captain.socketId, {
              event: 'new-ride',
              data: rideWithUser,
            });
          }
          else{
            console.log('error in the captain socketid')
          }
      });
   
  } catch (error) {
    console.error('Error creating ride:', error);
    if (!res.headersSent) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

const getFareController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors
            .array() });
    }
    const { pickup, destination } = req.query;
    try {
        const fare = await getFare( pickup, destination);
        res.status(200).json({ message: "Fare calculated successfully", fare });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
}
const confirmRide = async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors
            .array() });
    }
    const { rideId }= req.body;
    try{
        const ride = await confirmRideService(rideId,req.captain._id)
        return res.status(200).json(ride);
    }
    catch(err){
        return res.status(500).json({message: err.message})
    }
}

export {createRideController,getFareController,confirmRide};