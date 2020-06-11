var mongoose= require("mongoose") ;

module.exports= mongoose.model("ConversationDao",{
    name: {type : String, unique : true, required : true},
    password: {type : String, required : true},
    description: {type : String, required : true},
    requiredPassword : {type : Boolean , default: false },
    created: {type: Date, default: Date.now},
},"conversation")