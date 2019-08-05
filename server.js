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


//Data
const Post = require('./models/posts.js');
app.use(express.static('public'))


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


//index
app.get('/blogs', (req, res)=> {
    Post.find({}, (error, allPosts) =>{
        res.render('index.ejs', {
            post: allPosts
        })
        
    })
})



// new page of posts add to show
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
})
//new page for codes
const Code = require('./models/code.js');

app.get('/blogs/code',(req, res)=>{
    Code.find({}, (error, allCode) =>{
        res.render('code.ejs', {  
            code: allCode
        })
        
    })
})
//post create codee
app.post('/blogs/code', (req, res)=>{
    Code.create(req.body, (error, createdCode) =>{
        if(error) {
            res.send(error)
        } else {
            res.redirect('/blogs/code')
        }
    })
})
//show newCode
app.get('/blogs/newCode', (req, res) =>{
    res.render('newCode.ejs')
})



//post
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
})
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
    ///code show
    app.get('/blogs/code/:id', (req, res)=>{
        Code.findById(req.params.id, (err, foundCode)=>{
            res.render('code.ejs',{
                code: foundCode
            })
        })
    })
    //put code
    app.put('/blogs/code/:id', (req, res)=>{
        Post.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true },
            (err,updatedCode) =>{
                let codeId = req.params.id;
                if (err) {
                    console.log(err)
                } else {
                    res.redirect(`/blogs/code/${codeId}`)
                }
            }
            )
        })
        
        
        
        
        
        app.listen(PORT, () => {
            console.log('listening on ', PORT);
});