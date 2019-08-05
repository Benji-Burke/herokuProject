const express = require('express');
const Ben = express.Router();
const Code = require('../models/code.js')

//index of Code page
Ben.get('/',(req, res)=>{
    Code.find({}, (error, allCode) =>{
        res.render('code.ejs', {  
            code: allCode
        })
        
    })
})

//show newCode
Ben.get('/newCode', (req, res) =>{
    res.render('newCode.ejs')
})

// //post create codee
Ben.post('/', (req, res)=>{
    Code.create(req.body, (error, createdCode) =>{
        if(error) {
            res.send(error)
        } else {
            res.redirect('/code')
        }
    })
})


    ///code show
    Ben.get('/:id', (req, res)=>{
        Code.findById(req.params.id, (err, foundCode)=>{
            res.render('codeShow.ejs',{
                code: foundCode
            })
        })
    })

    // delete
    Ben.delete('/:id', (req, res)=>{
        Code.findByIdAndRemove(req.params.id, (err, deletedCode)=>{
            if (err) {
                console.log(err)
            } else {
                res.redirect('/code')
            }
        })
    })

    //put code
    Ben.put('/:id', (req, res)=>{
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

        module.exports = Ben;