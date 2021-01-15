const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    // email: {
    //     type: String,
    //     //required: true
    // },
    password: {
        type: String,
        required: true
    },
    
    // address:{
    //     type: String,
    // },
});

UserSchema.methods.encryptPassword = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
}

UserSchema.methods.validPassword =function (password) {
    return bcrypt.compareSync(password, this.password);
}
// UserSchema.pre('save', function (next){
//     const user = this;
//     bcrypt.hash(user.password, 10, (error, hash) => {
//         user.password = hash; 
//         next();
//     })
// });

const User = mongoose.model('User', UserSchema);
module.exports = User;