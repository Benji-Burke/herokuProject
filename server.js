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
const Code = require('./models/code.js');


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

//index of Code page
app.get('/code',(req, res)=>{
    Code.find({}, (error, allCode) =>{
        res.render('code.ejs', {  
            code: allCode
        })
        
    })
})

//show newCode
app.get('/newCode', (req, res) =>{
    res.render('newCode.ejs')
})

// //post create codee
app.post('/code', (req, res)=>{
    Code.create(req.body, (error, createdCode) =>{
        if(error) {
            res.send(error)
        } else {
            res.redirect('/code')
        }
    })
})


    ///code show
    app.get('/code/:id', (req, res)=>{
        Code.findById(req.params.id, (err, foundCode)=>{
            res.render('codeShow.ejs',{
                code: foundCode
            })
        })
    })

    // delete
    app.delete('/code/:id', (req, res)=>{
        Code.findByIdAndRemove(req.params.id, (err, deletedCode)=>{
            if (err) {
                console.log(err)
            } else {
                res.redirect('/code')
            }
        })
    })

    //put code
    app.put('/code/:id', (req, res)=>{
        Post.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true },
            (err,updatedCode) =>{
                let codeId = req.params.id;
                if (err) {
                    console.log(err)
                } else {
                    res.redirect(`/code/${codeId}`)
                }
            }
            )
        })
        
        
        
        
        
        app.listen(PORT, () => {
            console.log('listening on ', PORT);
});