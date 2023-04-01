const mongoose=require('mongoose');
// Creating User schema
const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
},{
    //mongoose maintain when the object is created and updated
    timestamps:true
});

//defining the schema to mongoose
const User=mongoose.model('User',userSchema);

module.exports=User;