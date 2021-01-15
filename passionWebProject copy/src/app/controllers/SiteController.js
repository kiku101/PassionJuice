const Products = require('../models/Product');
// const csrf = require('csurf');

// const csfProtection = csrf();

class SiteController {

    //[GET] /login
    // loginRender(req,res){
    //     res.render('login');
    // }

    //[GET] //register
    // registerRender(req,res){
    //     res.render('register', {csrfToken: req.csrfToken()});
    // }
    
    
    //[GET] /index
    index(req,res){
         res.render('index')
        
    }

    
}

module.exports = new SiteController;
