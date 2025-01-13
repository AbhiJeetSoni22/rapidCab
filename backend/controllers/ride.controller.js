import { createRide, getFare } from "../services/ride.service.js";
import { validationResult } from "express-validator";


const createRideController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { pickup, destination, vehicleType } = req.body;
    try {
      const ride =  await createRide({ userId:req.user._id, pickup, destination, vehicleType });
        res.status(201).json({ message: "Ride created successfully" , ride});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
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

export {createRideController,getFareController};