const mongoose = require('mongoose');
    Schema = mongoose.Schema;

//create a schema
const confessionSchema = new Schema({
    confession: String,
    moderated: {
        type: Boolean,
        default: false
    }
    });




//create the model
const confessionModel = mongoose.model('Confession', confessionSchema)

//export the model
    module.exports = confessionModel;

