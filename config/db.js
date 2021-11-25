const mongoose = require ("mongoose");
const config = require('./index')

const connectDB = async () =>
{
    console.log(config.mongoURI)
    try
    {
        const conn =  await mongoose.connect(config.mongoURI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            //useCreateIndex: true
        });        console.log("Database connected");
    } catch (error)
    {
        console.error("Error de here",error);   //Exit process with failure status
        process.exit(1);
    }
};
module.exports = connectDB;