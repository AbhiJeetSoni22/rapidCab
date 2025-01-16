import { resourceUsage } from "process";
import { Ride } from "../models/ride.model.js";
import { getDistanceTime } from "./maps.service.js";
import crypto from 'crypto';

async function getFare(pickup, destination) {
    if (!pickup || !destination) {
        throw new Error("Pickup and destination are required");
    }

    const distanceTime = await getDistanceTime(pickup, destination);
    console.log(distanceTime);  // Log to check the distanceTime object

    // Extract numeric values from the distance and time strings
    const distance = parseFloat(distanceTime?.distance?.replace(' km', '')) || 0;  // Remove ' km' and convert to number
    const time = parseFloat(distanceTime?.time?.replace(' mins', '')) || 0;  // Remove ' mins' and convert to number

    const baseFare = {
        auto: 25,
        car: 35,
        bike: 15,
    };

    const perKmRate = {
        auto: 10,
        car: 15,
        bike: 5,
    };

    const perMinRate = {
        auto: 2,
        car: 3,
        bike: 1,
    };

    const fare = {
        auto: baseFare.auto + perKmRate.auto * distance + perMinRate.auto * time,
        car: baseFare.car + perKmRate.car * distance + perMinRate.car * time,
        bike: baseFare.bike + perKmRate.bike * distance + perMinRate.bike * time,
    };

    console.log(fare);  // Log the calculated fare
    return fare;
}

function generateOTP(num) {
    const otp = crypto.randomInt(0, Math.pow(10, num)).toString().padStart(num, '0');
    return otp;
}

async function createRide({
    user, pickup, destination, vehicleType
}) {
    if(!user || !pickup||!destination||!vehicleType){
        throw new Error("userId, pickup, destination, vehicleType are required");
    }
    const fare = await getFare(pickup,destination);
    const ride = new Ride({
        user,
        pickup,
        destination,
        otp:generateOTP(5),
        fare:fare[vehicleType],
    });
   await ride.save();
   return ride
}

async function confirmRideService({rideId, captain}) {
    if (!rideId || !captain || !captain._id) {
        throw new Error('Ride ID and captain are required');
    }

    // First update the ride with captain info
   await Ride.findOneAndUpdate({
    _id:rideId},{
        status:'accepted',
        captain:captain._id
    }
   )
   const ride = await Ride.findOne({
    _id:rideId
   }).populate('user').populate('captain').select('+otp');

    if (!ride) {
        throw new Error('Ride not found');
    }

    return ride;
}

export { createRide, getFare, generateOTP,confirmRideService };