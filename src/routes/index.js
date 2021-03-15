const express = require('express');
const router = express.Router();
//pool es la conexion a la base de datos
const pool = require('../database');

router.get('/',(req,res)=>{
    res.render('inicio.hbs')
    //res.send("ya casi");
});
module.exports=router;