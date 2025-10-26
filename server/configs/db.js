import mongoose from "mongoose";

const connectDB = async () => {
    try {
        mongoose.connection.on('connected', () => console.log("Database Connected"));

        // Connects to the database using the URI from the .env file,
        // and specifies 'quickblog' as the database name.
        await mongoose.connect(`${process.env.MONGODB_URI}/quickblog`);
    } catch (error) {
        console.log(error.message);
    }
}

export default connectDB;