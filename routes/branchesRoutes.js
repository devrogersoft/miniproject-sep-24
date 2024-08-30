const express = require("express");
const app = express();
const fm = require("../controllers/branchesController");


module.exports = function (app) {
    app.get('/branches',(req, res)=>{
        fm.read_all(req, res);
    });
    app.post('/branch',(req, res)=>{
        fm.write(req, res);
    });
    app.get('/branch/:code',(req, res)=>{
        fm.read_one(req, res);
    });
}

