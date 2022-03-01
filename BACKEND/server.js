//assigning dependences(importing packages)

//To use import keyword => package.json and add another key value pair after line 5 '"type": "module",'
//import express from 'express';
//import mongoose from 'mongoose';
//import bodyParser from 'body-parser';
//import cors from 'cors';
//import dotenv from 'dotenv';

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

const app = express();
require('dotenv').config();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

const URL = process.env.MONGODB_URL;

//no need to use this line because of the security reasons(because anyone, who can access the code can get the cluster password)
//const URL = 'mongodb+srv://00prabashwara123:<ClusterPassWord>*@demoitp.mx8hm.mongodb.net/student_db?retryWrites=true&w=majority'

mongoose.connect(URL, {
    //useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //useFindAndModify: false
});

//having some problems with the usecreateindex and usefindandmodify.

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB Connection Success!!!!");
});

//create a constant varialbe and assign the path to get access to the students routes
const studentRouter = require("./routes/students.js");

//the following line is use to create this ('http://localhost:5000/student') url and call it 
/* what happens in behind is that when user call that url mention above 
the stutents.js file will load to the server */
app.use("/student", studentRouter);

app.listen(port, () => {
    console.log('Server is up and running on port: %d', port);
});



