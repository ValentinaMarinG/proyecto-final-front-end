const mongoose = require("mongoose"); 
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name: {type: String, required: true, unique: true },
    description: {type: String},
    active : {type:Boolean, default:false},
})

module.exports = mongoose.model("CategoryCollection", categorySchema);