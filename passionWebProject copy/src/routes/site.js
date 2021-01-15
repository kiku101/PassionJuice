const express = require('express');
const { model } = require('mongoose');
const router = express.Router();
const passport = require('passport')
const Product = require('../app/models/Product');

router.get('/:page', function(req, res, next) {
    var perPage = 4
    var page = req.params.page || 1
 
    Product
        .find({})
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .exec(function(err, products) {
            Product.count().exec(function(err, count) {
                if (err) return next(err)
                res.render('index', {
                    products: products,
                    current: page,
                    pages: Math.ceil(count / perPage)
                })
            })
        })
})

router.get('/', (req,res,next) =>{
    res.redirect('/1');
});


module.exports = router;