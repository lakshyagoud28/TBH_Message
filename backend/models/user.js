const { string } = require("joi");
const Mongoose = require("mongoose");

const Schema = Mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  verificationcode: String,
  
  isverified: { 
    type: Boolean,
    default: false ,
  required: true
},

tbhmsg:{
type:String,
default: "",
},
});

const UserModel = Mongoose.model("user", UserSchema);
module.exports = UserModel;
