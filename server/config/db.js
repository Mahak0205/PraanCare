const mongoose = require("mongoose");

const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_DB_CONNECTION_STRING,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Mongodb successfully connected');
    } catch(error){
        console.error('MongoDB connection error: ', error);
        process.exit(1)
    }
}

module.exports = connectDB;