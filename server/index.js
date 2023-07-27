const express = require("express");
const app = express();
const router = require("./router")
const debug = require('debug')("my-application")
const bodyParser = require("body-parser");
const cors = require("cors");
const port = 3005;

app.use(express.static('upload'))
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:true
}));
app.use("/api",router)
// cors跨域处理
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3005");
    res.header("Access-Control-Allow-Headers", "Content-Type,Access-Token");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
})

app.listen(port,() =>{
    debug("服务器运行在:http://localhost:"+port);
})