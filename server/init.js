

let initRoutes= [

];
let port = 5002;
let getConfig = (type) => type !=="production" ? {root : "dist"} : {root: "build"};

module.exports={
    getConfig,
    initRoutes,
    port
}