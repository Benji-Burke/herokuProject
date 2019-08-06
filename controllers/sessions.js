const express = require('express');
const log = express.Router();
const User = require('../models/users.js');

log.get('/', (req,res) =>{
    res.render('sessions/new.ejs')
})

log.post('/', (req, res) =>{
    User.findOne({ username: req.body.username }, 
        (err, foundUser) =>{
        if (req.body.password === foundUser.password) {
            res.redirect('/blogs');
        } else {
            res.send('wrong password');
        }
    });
});

log.delete('/', (req, res)=>{
    req.session.destroy(()=>{
        res.redirect('/blogs')
    })
})

module.exports = log;