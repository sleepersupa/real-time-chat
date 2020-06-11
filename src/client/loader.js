import React from "react"
import ReactDOM from "react-dom";
import {MainRoutes} from "./app/main-routes";
import {security} from "../security/secuiry-fe";


Promise.all([security.init()]).then(([data1]) => {
    ReactDOM.render(<MainRoutes/>,document.getElementById("wrapper"));
})
