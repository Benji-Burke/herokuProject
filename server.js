// Dependencies 
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const methodOverride = require('method-override');

//middleware
app.use(express.urlencoded({extended: true}))

app.use(express.json());
app.use(methodOverride('_method'));





//html
app.use(express.static('public'))


//Data
const PostController = require('./controllers/posts.js');
app.use('/blogs', PostController);


const CodeController = require('./controllers/codes.js');
app.use('/code', CodeController);


//port
const PORT =process.env.PORT || 3000;
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


//new page for codes


        
        
        
        
        
        app.listen(PORT, () => {
            console.log('listening on ', PORT);
});