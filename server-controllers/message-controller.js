
let MessageDAO = require("../dao/message-dao");

module.exports =(app) =>{
    app.get("/conversation/:id/messages" , async (req, res) =>{
        MessageDAO.find({ conversationId : req.params.id} ,(err, results) =>{
            return res.send(results);
        })
    })
}