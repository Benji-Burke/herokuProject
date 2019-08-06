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
            req.session.currentUser = foundUser;
            res.redirect('/');
        } else {
            res.send('wrong password');
        }
    });
});

log.delete('/', (req, res)=>{
    req.session.destroy(()=>{
        res.redirect('/');
    });
})

module.exports = log;