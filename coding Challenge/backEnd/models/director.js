const mongoose = require('mongoose');
const directorSchema = new mongoose.Schema({
    directorName:{ type:String, required:true },
    age:{type:Number},
    gender:{type:String,required:true},
    awardCount:{type:Number,require:true}
});

const directorModel = mongoose.model("Director",directorSchema,"directors");

module.exports = directorModel; 