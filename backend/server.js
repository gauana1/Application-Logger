require('dotenv').config(); 
const express = require("express");
const applicationRoutes = require('./routes/applications');
const userRoutes = require('./routes/users');
const app = express();
const mongoose = require('mongoose');
app.use(express.json());
var request = require('request');


//route
app.use('/applications', applicationRoutes);
app.use('/users', userRoutes);

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
.then(()=> {
  app.listen(process.env.PORT);
  console.log('connected');
})
.catch((err) => console.log(err))


