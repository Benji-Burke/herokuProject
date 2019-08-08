const express = require('express');
const log = express.Router();
const User = require('../models/users.js');
const bcrypt = require('bcrypt');


log.get('/', (req,res) =>{
    res.render('sessions/new.ejs', {

        currentUser: req.session.currentUser
    }
    )
})




log.post('/', (req, res) => {
    User.findOne({username: req.body.username}, (err, foundUser) => {
            if (req.body.username === ""){
                res.send('Please enter a username')
            } else if (req.body.password === "") {
                res.send('Please enter a password')
            } else if (!foundUser) {
                res.send('Username Invalid')
            } else if (bcrypt.compareSync(req.body.password, foundUser.password)) {
                req.session.currentUser = foundUser;
                res.redirect('/');
            } else {
                res.send('wrong password');
            }
        })
})

log.delete('/', (req, res)=>{
    req.session.destroy(()=>{
        res.redirect('/');
    });
})

module.exports = log;