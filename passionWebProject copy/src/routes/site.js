const express = require('express');
const { model } = require('mongoose');
const { session } = require('passport');
const router = express.Router();
const passport = require('passport')
const Product = require('../app/models/Product');
const Cart = require('../app/models/cart');

router.get('/product/:id', (req,res,next) => {
    
    Product.findById(req.params.id, (err,detailProduct) => {
        res.render('detailProduct', {
            detailProduct
        });
    })
});
   

router.get('/shopping-cart',  (req,res,next) => {
    if(!req.session.cart){
        return res.render('shoppingCart', {products :null});
    }
    var cart = new Cart(req.session.cart);
    res.render('shoppingCart', {products: cart.generateArray(), totalPrice: cart.totalPrice});
})


router.get('/add-to-cart/:id', (req,res,next) => {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    Product.findById(productId, function (err, product) {
        if (err){
            return res.redirect('/');
        }
            cart.add(product, product.id);
            req.session.cart = cart;
            console.log(req.session.cart);
            res.redirect('/');
    })
})

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