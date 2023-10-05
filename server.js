const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const  connectDB  = require('./config/db');
const authRoute = require('./routes/authRoute');
// const categoryRoutes = require('./routes/categoryRoutes')
// const productRouttes = require('./routes/productRoutes')
const cors = require('cors');

//configure env
dotenv.config();

//Database config
connectDB()

// rest object 
const app = express();

//middleware
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

//routes
app.use('/api/v1/auth',authRoute)
// app.use('/api/v1/category',categoryRoutes)
// app.use('/api/v1/product',productRouttes)


//rest api 
app.get('/',(req,res)=>{
   res.send({
      message:"Welcome to ecommerce mern stack  app"
   })
})



// PORT
const PORT = process.env.PORT || 8000;

//run listen 
app.listen(PORT,()=>{
   console.log(`Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan.white);
})




