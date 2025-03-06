// const mongoose = require("mongoose")
// require("dotenv").config()

// const connectDB = async () => {
//     try {
//         console.log("Connecting to:", process.env.MONGO_URI); 
//         await mongoose.connect(process.env.MONGO_URI)
//         console.log("mongoDB connection etablish successfuly !");
//     } catch (error) {
//         console.error(`mongoDB connection error : ${error.message}`);
//         process.exit(1)
//     }
// }
// module.exports =  connectDB 

const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
    try {
        console.log("Connecting to:", process.env.MONGO_URI);
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB connection established successfully!");
    } catch (error) {
        console.error(`MongoDB connection error: ${error.message}`);
        
        // Instead of exiting, you can retry or handle errors differently
        process.exit(1); // Keep this if you want the server to stop on DB failure
    }
};

module.exports = connectDB;

