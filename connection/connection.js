var mongoose = require('mongoose')
mongoose.connect(`${process.env.DB_NAME}`, (err) => {
    if (!err) {
        console.log("connection sucessfull..")
    }
    else {
        console.log("error in connection " + JSON.stringify(err, undefined, 2));
    }
});
module.exports = mongoose;