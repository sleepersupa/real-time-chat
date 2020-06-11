
var mongoose= require("mongoose") ;

let returnError = (res , data ) => {
    res.send(data);
}

let findById = (col, id) => new Promise((res, rej) =>col.findOne({_id : id}, (err, rs)=> res(rs))) ;
let findByFields = (col, filter) => new Promise((res,rej) =>  col.findOne(filter ,(err, rs) => res(rs)));

module.exports = {
    findById,
    findByFields
}
