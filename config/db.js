const mongoose = require('mongoose');
const colors = require('colors');

const connectDB = async ()=>{
   try {
      const conn = await mongoose.connect(process.env.MONGO_URL);
      console.log(`Connected To MongoDB Database ${conn.connection.host} in`.bgMagenta.white);
   } catch (error) {
      console.log(`Error in Mongodb ${error}`.bgRed.white);
   }
}

module.exports = connectDB;





