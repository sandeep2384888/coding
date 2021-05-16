const express=require('express');
const mongoose = require('mongoose');
var cors = require('cors');

var bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

const route=require('./routes/routes');

const MONG_URL = `mongodb+srv://nobody:change76@firstdemoproject.nzko4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const conncetion = mongoose.connect(MONG_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}, (err) => {
    if (err) {
        console.log("unable to connect");
    }
    else {
        console.log("Connection Successfull");
    }
});

// mongoose.connect("mongodb://localhost/filmchamber",{
//     useNewUrlParser:true}).then(()=>
// {
//     console.log("connected..");
// }).catch(()=>
// {
//     console.log("Not Connected..");
// });

//app.use('/',route);


app.use('/', route);

var server = app.listen(4444, () => {

    var port = server.address().port;
    console.log(`"server is running ${port}"`);
})