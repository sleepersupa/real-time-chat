var mongoose= require("mongoose") ;

module.exports= mongoose.model("UserDao",{
    username: {type : String, unique : true, required : true},
    password: {type : String, required : true},
    address: String,
    phone : String,
    name: String,
    created: {type: Date, default: Date.now},
    isAdmin: Boolean,
    type : {type : Number , default: 1}
},"user")