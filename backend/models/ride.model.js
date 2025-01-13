import mongoose from "mongoose";
import { Schema } from "mongoose";

const rideSchema = new Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    captain:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Captain',
    },
    pickup:{
        type: String,
        required: true
    },
    destination:{
        type: String,
        required: true
    },
    fare:{
        type: Number,
        required: true
    },
    status:{
        type: String,
        enum: ['pending','accepted','ongoing','started','completed','cancelled'],
        default: 'pending'
    },
    duration:{
        type:Number
    },
    distance:{
        type:Number
    },
    paymentID:{
        type:String
    },
    orderID:{
        type:String
    },
    signature:{
        type:String
    },
    otp:{
        type: String,
        select:false,
        required: true
    }
})

export const Ride = mongoose.model('Ride',rideSchema);