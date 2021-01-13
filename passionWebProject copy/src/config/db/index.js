const mongoose = require('mongoose');
const mongoAtLasUri = "mongodb+srv://testblog1:jujihu195S@cluster0.7zzqm.mongodb.net/dbblogdev1?retryWrites=true&w=majority";

async function connect(){
    try {
        await mongoose.connect(
            mongoAtLasUri,
            {useNewUrlParser: true, useUnifiedTopology: true},
            () => console.log("Connected!!!"),
        )
    } catch (error) {
        console.log("Failed!!!");
    }

}

module.exports = { connect }