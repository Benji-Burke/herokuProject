const express = require('express');
const subpost = express.Router();
const Sub = require('../models/subPosts.js');

//index
subpost.get('/sub', (req, res) => {
  Sub.find({}, (error, allSub) => {
    res.render('index.ejs', {
      sub: allSub,

      currentUser: req.session.currentUser
    });
  });
});

//new page of subs add to showSup
subpost.get('/newSub', (req, res) => {
  res.render('newSub.ejs', {
    currentUser: req.session.currentUser
  });
});

//post(create)
subpost.post('/', (req, res) => {
  Sub.create(req.body, (error, createdSum) => {
    if (error) {
      res.send(error);
    } else {
      res.redirect('/blog');
    }
  });
});

//show
subpost.get('/:id', (req, res) => {
  Sub.findById(req.params.id, (err, foundSub) => {
    res.render('showSub.ejs', {
      sub: allSub,
      currentUser: req.session.currentUser
    });
  });
});

//delete
subpost.delete('/:id', (req, res)=>{
    Sub.findByIdAndRemove(req.params.id, (err, deletedSub)=>{
        if(err {
            console.log(err)
        }) else {
            res.redirect('/sub')
        }
    })
})

//edit
subpost.get('/:id/edit', (req, res)=>{
    Sub.findById(req.params.id, (err, foundSub)=>{
        if (err) {
            console.log(err)
        } else {
            res.render('editSub.ejs', {
                sub: foundSub
            })
        }
    })
})

//put 
subpost.put('/:id', (req, res)=>{
    Sub.findByIdAndUpdate{
        req.params.id,
        req.body,
        {new: true}, 
        (err, updatedSub)=>{
            let subId = req.params.id;
            if (err) {
                console.log(err)
            } else {
                res.redirect(`/sub/${subId}`)
            }
        }
    }
})