// Dependencies 
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const methodOverride = require('method-override');

//middleware
app.use(express.urlencoded({extended: false}))
app.use(express.static('public'))
app.use(express.json());
app.use(methodOverride('_method'));


//Data
const Post = require('./models/posts.js');


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


//index
app.get('/blogs', (req, res)=> {
    Post.find({}, (error, allPosts) =>{
        res.render('index.ejs', {
            post: allPosts
    })
        
    })
})


// new page
app.get('/blogs/new', (req, res)=>{
    res.render('new.ejs')
});

//post(create)
app.post('/blogs/', (req, res)=>{
    console.log(req.body)
    Post.create(req.body, (error, createdPost) =>{
        if (error) {
            res.send(error)
        } else {
            res.redirect('/blogs')
        }
        
    })

});  
//show
app.get('/blogs/:id', (req, res)=>{
    Post.findById(req.params.id, (err, foundPost) =>{
        res.render('show.ejs', {
            post: foundPost
        })
    })
})

// delete
app.delete('/blogs/:id', (req, res)=>{
    Post.findByIdAndRemove(req.params.id, (err, deletedPost)=>{
        if (err) {
            console.log(err)
        } else{
            res.redirect('/blogs');
            
        }
    })
});
//edit
app.get('/blogs/:id/edit', (req, res)=>{
    Post.findById(req.params.id, (err, foundPost)=>{
        if (err) {
            console.log(err)
        } else {
            res.render('edit.ejs', {
                post: foundPost
            });
        }
    })
})




//put
app.put('/blogs/:id', (req, res)=>{
    Post.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true },
        (err,updatedPost) =>{
            let blogId = req.params.id;
            if (err) {
                console.log(err)
            } else {
                res.redirect(`/blogs/${blogId}`)
            }
        }
    )
})


const seed = require('./models/seed.js');
const User = require('./models/posts.js');

app.get('/seedAgents', (req, res) => {
    // encrypts the given seed passwords
    // seeds the data
    User.create(seed, (err, createdUsers) => {
      // logs created users
      console.log(createdUsers);
      // redirects to index
      res.redirect('/blogs');
    });
  });

// listener
app.listen(PORT, () => console.log('listening on the pprt', PORT));