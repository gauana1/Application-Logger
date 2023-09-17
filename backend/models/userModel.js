const mongoose= require("mongoose");
const bcrypt = require("bcrypt");
const validator = require('validator')
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email:{
        type:String, 
        required:true, 
        unique:true
    },
    password:{
        type:String, 
        required:true
    }
})

//static signup method
userSchema.statics.signup = async function (email, password) 
{
    if(!email || !password){
        throw Error('All fields must be filled');
    }
    if(!validator.isEmail(email)){
        throw Error("Enter a Valid Email");
    }
    if(!validator.isStrongPassword(password)){
        throw Error("Password not Strong Enough");
    }

    const exists = await this.findOne({email});
   
    if(exists){
        throw Error('Email in Use')
    }
    
    const salt = await bcrypt.genSalt(10);
    const hash  = await bcrypt.hash(password, salt);

    const user = await this.create({email, password:hash});
    return user;

}



//static model method

userSchema.statics.login  = async function(email, password)
{
    if(!email || !password){
        throw Error('All fields must be filled');
    }
    const user = await this.findOne({email});
   
    if(!user){
        throw Error('Incorrect Email')
    }

    const match = await bcrypt.compare(password, user.password);
    if(!match)
    {
        throw Error("Incorrect Password");
    }
    return user;

}
module.exports = mongoose.model('User',userSchema)