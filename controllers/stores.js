const express = require('express'); 
const store = express.Store();
const Shop = require('../models/stores.js');

//index for store
store.get('/store', (req, res)=>{
    Shop.find({}, (error, allStore)=>{
        res.render('store.ejs', {
            

            currentUser: req.session.currentUser
        })
    })
})

// new page
store.get('/store/new', (req, res) =>{
    res.render('addItem.ejs');
})


//create
store.post('/store/', (req, res) => {
    Shop.create(req.body, (error, createdshop) => {
      // newProduct = {
      // }
      res.redirect('/store');
    });
  });

//show
show.get('/store/:id', (req, res) => {
    console.log(req.params.id);
    Shop.findById(req.params.id, (err, foundProduct) => {
      console.log(foundProduct);
      res.render('show.ejs', {
        Shop: foundShop
      });
    });
  });

  //Delete
show.delete('/store/:id', (req, res)=>{
    Shop.findByIdAndRemove(req.params.id, (err, deletedShop)=>{
        if (err) {
            console.log(err);
        } else {
            res.redirect('/store')
        }
    })
})

//update
store.get('/store/:id/edit', (req, res)=>{
    Shop.findByIdAndUpdate(req.params.id,)
})

module.exports=store;