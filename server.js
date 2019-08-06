// Dependencies 
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const methodOverride = require('method-override');
const session = require('express-session');

//middleware
app.use(express.urlencoded({extended: true}))

app.use(express.json());
app.use(methodOverride('_method'));
app.use(session({
    secret: "freedmeseymour",
    resave: false,
    saveUnitialized: false
}));




//html
app.use(express.static('public'))


//Data
//post 
const PostController = require('./controllers/posts.js');
app.use('/blogs', PostController)

//post codes
const CodeController = require('./controllers/codes.js');
app.use('/code', CodeController);

//log in
const sessionsController = require('./controllers/sessions.js');
app.use('/sessions', sessionsController);

//create user
const usersController = require('./controllers/users.js');
app.use('/users', usersController);


// Routes
//localhost: 3000

app.get('/', (req, res) =>{
    res.redirect('/blogs')

  
});


//port
const PORT =process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/blog'
// Connect to Mongo
mongoose.connect(MONGODB_URI, { useNewUrlParser: true},() =>{
    console.log('we are connected YO')
});








//new page for codes


        
        
        
        
        
        app.listen(PORT, () => {
            console.log('listening on ', PORT);
});