require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const userRoute = require("./routes/user");
const authRoute = require('./routes/auth');
const productRoute = require('./routes/product');
const orderRoute = require('./routes/order');
const cartRoute = require('./routes/cart');
const razorpaycheckout = require('./routes/razorpaycheckout');
const cors = require('cors');

// file upload
const fileUpload = require('express-fileupload');


mongoose.set('strictQuery', false);
mongoose.connect(process.env.DATABASE_URI)
    .then(()=>console.log("Db connected"))
    .catch((err)=>console.log(err));



const PORT = 5000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));
app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);
app.use('/api/products', productRoute);
app.use('/api/orders', orderRoute);
app.use('/api/cart', cartRoute);
app.use('/api/checkout', razorpaycheckout);
app.listen(PORT, ()=>console.log("Listening to: "+PORT));