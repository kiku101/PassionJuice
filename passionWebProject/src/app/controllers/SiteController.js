const User = require('../models/User');

class SiteController {

    //[POST] /regist

    regist(req,res,next){
        User.create(req.body, (error, user) => {
            if (error) {
                // return res.redirect('/auth/register')
                console.log("Ok");
            }
            console.log('notOK');
            // res.redirect('/')
        })

    }

    
}

module.exports = new SiteController;
