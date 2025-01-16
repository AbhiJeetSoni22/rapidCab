import { Captain } from "../models/captain.model.js";
import { getAddressCoordinate,getDistanceTime,getAutoCompleteSuggestions } from "../services/maps.service.js";
import { validationResult } from "express-validator";

const getCoordinates = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  const address = req.query.address;
  try {
    const coordinates = await getAddressCoordinate(address);
    res.status(200).json(coordinates);
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: "Coordinate not found" });
  }
}

const getAddressesDistanceTime = async (req, res) => {
  const { origin, destination } = req.query;
  try {
    const distanceTime = await getDistanceTime(origin, destination);
    res.status(200).json(distanceTime);
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: "Distance and time not found" });
  }
}

const getSuggestions = async (req, res) => {
   try {
       const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
    const input = req.query.input;
    const suggestions = await getAutoCompleteSuggestions(input);
    res.status(200).json(suggestions);
   } catch (error) {
    console.error(error);
    res.status(404).json({ error: "Suggestions not found" });
    
   }
}
const getCaptainsInTheRadius = async(lat, lng, radius) => {
  try {
    // Validate coordinates
    if ( !lat || !lng) {
      console.error('Invalid coordinates:', { lat, lng });
      return [];
    }
    const captains = await Captain.find({
      'location.lat': { $exists: true },
      'location.lng': { $exists: true },
      'location.lat': { $gte: lat - radius, $lte: lat + radius },
      'location.lng': { $gte: lng - radius, $lte: lng + radius }
    });
    
   
   
    return captains;
  } catch (error) {
    console.error('Error finding captains:', error);
    return [];
  }
}

export  { getCoordinates,getAddressesDistanceTime , getSuggestions,getCaptainsInTheRadius};