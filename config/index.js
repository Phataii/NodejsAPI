const env = process.env.NODE_ENV;
//console.log(env)
module.exports = {
    mongoURI: env === "development" ? "mongodb://localhost:27017/social" : process.env.MONGO_URL
    
}