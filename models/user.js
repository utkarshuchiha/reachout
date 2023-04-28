const mongoose=require('mongoose');
const multer=require('multer');
const path=require('path');
const AVATAR_PATH=path.join('/uploads/users/avatars');


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
    avatar:{
        type:String
    }
},{
    //mongoose maintain when the object is created and updated
    timestamps:true
});

let storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,path.join(__dirname,'..',AVATAR_PATH));
    },
    filename:function(req,file,cb){
      
        cb(null,file.fieldname+"-"+Date.now());
    }
});

//statics
userSchema.statics.uploadedAvatar=multer({storage:storage}).single('avatar');//only one file to be saved to fieldname avatar
userSchema.statics.avatarPath=AVATAR_PATH;

//defining the schema to mongoose
const User=mongoose.model('User',userSchema);

module.exports=User;