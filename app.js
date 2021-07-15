const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require("dotenv").config();
const path = require('path');
const userRoutes = require('./routes/user');
const memoriesRoute = require('./routes/memory');
const diaryRoute = require('./routes/diary');

mongoose.connect(process.env.MONGO_URL_DEV, {useNewUrlParser: true, useUnifiedTopology: true});

const app = express();
// Log request data
app.use(morgan('dev'));
app.use(express.static('public'));
app.use('/images', express.static('images'));
// Use body parser middleware to parse body of incoming requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Setup CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

// Routes which should handle requests
app.use('/user', userRoutes);
app.use('/memory', memoriesRoute);
app.use('/diary', diaryRoute);

if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname, '/client/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  })
}

// Handle Error Requests
app.use((req, res, next) => {
    const error = new Error();
    error.message = 'Not Found';
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        error: error,
    });
});

module.exports = app;
