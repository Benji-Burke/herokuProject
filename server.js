// Dependencies 
const express = require('express');
const mongoose = require('mongoose');
const app = express();

//port
const PORT =process.env.PORT || 3000;

// Database
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/blog'

// Connect to Mongo
mongoose.connect(MONGODB_URI, { useNewUrlParser: true},() =>{
    console.log('we are connected YO')
});


// Routes
//localhost: 3000

app.get('/', (req, res) =>{
    res.send('app is running!');
});

// listener
app.listen(PORT, () => console.log('listening on the pprt', PORT));