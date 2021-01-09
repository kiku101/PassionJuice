const Products = require('../models/Product');

class SiteController {

    //[GET] /login
    loginRender(req,res){
        res.render('login');
    }

    //[GET] //register
    registerRender(req,res){
        res.render('register');
    }
    
    
    //[GET] /index
    index(req,res){
        Products.find({}, (error, pro) => {
            res.render('index',{
                products: pro
            });
        })
        
    }

    
}

module.exports = new SiteController;
