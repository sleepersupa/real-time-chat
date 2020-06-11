
module.exports =(app) => {

    const multer = require("multer");
    let prodMode = process.env.NODE_ENV === 'production';
    const storage= multer.diskStorage({
        destination:(req, file, cb)=>{
            cb(null,__dirname+ `/../${prodMode ? "build" : "dist"}/uploads/`) ;
        },
        filename:(req, file, cb)=>{
            let tail = file.originalname.split(".")[1];
            console.log(tail)
            cb(null,  `file.originalname_${new Date().getTime()}`) ;
        }
    })

    const upload= multer({storage : storage})
    app.post("/file/upload" , upload.single('imageFile') , (req,res) =>{
        // console.log(req.file)
        if(req.file){
            // setTimeout(()=>{
            res.send({filePath: "/uploads/"+req.file.filename})
            // },5000)
        }
    })
}