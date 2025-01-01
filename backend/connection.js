import mongoose from 'mongoose';

// Connect to MongoDB
async function dbConnection(){
    try {
        await mongoose.connect(`${process.env.MONGODB_URL}/uberDB`)
        console.log('Connected to MongoDB!')
    } catch (error) {
        console.log(`error during database connection ${error}`)
    }
}

export default dbConnection;