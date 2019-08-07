const express=require('express');
const User = require('../models/users.js');
const newUser =express.Router();
const bcrypt = require('bcrypt');

newUser.get('/new', (req, res)=>{
    res.render('users/newUser.ejs')
})


newUser.post('/', (req, res)=>{
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    User.create(req.body, (err, createdUser)=>{
        res.redirect('/blogs');
    })
})



module.exports = newUser;