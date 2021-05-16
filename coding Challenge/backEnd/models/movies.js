const mongoose = require('mongoose');
const filmSchema = new mongoose.Schema({
    movieName:{ type:String, required:true,},
    id:{type:Number},
    boxOffice:{type:Number,required:true},
    rating:{type:Number,require:true},
    directorName:{type:String,required:true}
});

const filmModel = mongoose.model("film",filmSchema,"films");

module.exports =  filmModel; 