const express = require('express');
const router = express.Router();
const Post = require('../models/posts.js')


//index
router.get('/', (req, res)=> {
    Post.find({}, (error, allPosts) =>{
        res.render('index.ejs', {
            post: allPosts
        })
        
    })
})



// new page of posts add to show
router.get('/new', (req, res)=>{
    res.render('new.ejs')
});


//post(create)
router.post('/', (req, res)=>{
    console.log(req.body)
    Post.create(req.body, (error, createdPost) =>{
        if (error) {
            res.send(error)
        } else {
            res.redirect('/blogs')
        }
    })
})

//show
router.get('/:id', (req, res)=>{
    Post.findById(req.params.id, (err, foundPost) =>{
        res.render('show.ejs', {
            post: foundPost
        })
    })
})

// delete
router.delete('/:id', (req, res)=>{
    Post.findByIdAndRemove(req.params.id, (err, deletedPost)=>{
        if (err) {
            console.log(err)
        } else{
            res.redirect('/blogs');
            
        }
    })
})
//edit
router.get('/:id/edit', (req, res)=>{
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
router.put('/:id', (req, res)=>{
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




module.exports = router;