const express=require('express');
const User = require('../models/users.js');
const newUser =express.Router();

newUser.get('/new', (req, res)=>{
    res.render('users/newUser.ejs')
})


newUser.post('/', (req, res)=>{
    User.create(req.body, (err, createdUser)=>{
        res.redirect('/blogs');
    })
})



module.exports = newUser;