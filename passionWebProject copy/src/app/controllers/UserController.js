const User = require('../models/User');
const { loginValidation } = require("../auth/validation")
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")

class UserController{

    //[POST] /user/register
    // regist(req,res){
    //     User.create(req.body, (error, user) => {
    //         console.log(req.body);
    //         if (error) {
    //             console.log(error);
    //             return res.redirect('/register');
    //         }
    //         console.log('OK');
    //           res.redirect('/login')
    //     })

    // }

    //[POST] /user/login
    // async login(req, res){
    //     // Validate user
    //     const{ error } = loginValidation(req.body);
    //      if(error) return res.status(400).send(error.details[0].message)
    
    //      // Kiểm tra email
    //      const userLogin = await User.findOne({username: req.body.username});
    //      if(!userLogin) return res.status(400).send("Không tìm thấy username")
    
    //      // Kiểm tra password
    //      const passLogin = await bcrypt.compare(req.body.password, userLogin.password);
    //      if(!passLogin) return res.status(400).send("Mật khẩu không hợp lệ")
    
    //      // Ký và tạo token
    //      const token = jwt.sign({_id: userLogin._id}, 'tuananhdeptrai')
    //     res.header("auth-token", token).send(token);
    // }
}

module.exports = new UserController;
