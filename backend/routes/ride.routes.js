import express from 'express';
import { body,query } from 'express-validator';
import{ createRideController,getFareController} from '../controllers/ride.controller.js';
import { authUser } from '../middleware/auth.middleware.js';
const router = express.Router();


router.post('/create',

body('pickup').isString().isLength({min: 3}).withMessage('invalid pickup address'),
body('destination').isString().isLength({min: 3}).withMessage('invalid destination address'),
body('vehicleType').isString().isIn(['auto','car','bike']).withMessage('invalid vehicle type')
    ,
    authUser,createRideController)

router.get('/get-fare',
    query('pickup').isString().isLength({min: 3}).withMessage('invalid pickup address'),
    query('destination').isString().isLength({min: 3}).withMessage('invalid destination address')
    ,authUser,getFareController)

export default router;