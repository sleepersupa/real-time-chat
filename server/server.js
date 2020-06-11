var express = require("express");
var app = express();
var compression = require('compression')
app.use(compression())
const path = require("path");
const bodyParser = require("body-parser");
var config = require("./init").getConfig(process.env.NODE_ENV);

var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/real-time-chat", { useNewUrlParser: true });
app.use(express.static(path.join(__dirname , ".." , config.root )) );
app.use("/api", bodyParser.json({limit: '10mb', extended: true}));
app.use("/api", bodyParser.urlencoded({limit: '10mb', extended: true}))
let router = express.Router();
app.use("/api", router);
require("../server-controllers/user-controller")(router);
require("../server-controllers/upload-controller")(router);
require("../server-controllers/message-controller")(router);

app.get("*",(req, res, next) => {
    res.sendFile(path.join(__dirname , "..", config.root ,"index.html"));
});

var server = app.listen(process.env.PORT || require('./init').port , function () {
    var port = server.address().port;

    console.log('Listening at http://localhost:%s', port);
});

var io = require('socket.io')(server);

let MessageDAO = require("../dao/message-dao")
io.on("connection", (client) => {
    console.log('a user connected. Client id: ' + client.id);
    client.on('chat message', (data) => {
        if(data.message.length > 0 ){
            let newMes = {conversationId: "5ecbfc084fe2d412d261accb" , text : data.message , user : {} }
            MessageDAO.create(newMes).then((rs) =>{
                console.log(rs);
                if(rs) io.emit('chat message', rs);
            })
        }
    });
})