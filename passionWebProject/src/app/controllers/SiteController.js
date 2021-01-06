
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
        res.render('index');
    }

    
}

module.exports = new SiteController;
