var mongoose= require("mongoose") ;

module.exports= mongoose.model("MessageDao",{
    conversationId : {type : String},
    text : String,
    user : Object,
    created: {type: Date, default: Date.now},
},"message")