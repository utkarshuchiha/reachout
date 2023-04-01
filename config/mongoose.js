const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/REACHOUT_dev');
const db=mongoose.connection;
db.on('error',console.error.bind(console,"Error contacting to db"));

db.once('open',function(){
    console.log('CONNECTED TO DATABASE');
});

module.exports=db;