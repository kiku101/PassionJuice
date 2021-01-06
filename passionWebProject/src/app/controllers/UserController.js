const User = require('../models/User');

class UserController{

    //[POST] /user/register
    regist(req,res){
        User.create(req.body, (error, user) => {
            console.log(req.body);
            if (error) {
                // console.log(error);
                return res.redirect('/register');
            }
            console.log('OK');
              res.redirect('/')
        })

    }

}

module.exports = new UserController;
