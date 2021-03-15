const express = require('express');
const router = express.Router();
//pool es la conexion a la base de datos
const pool = require('../database');

router.get('/alimentos',(req,res)=>{
    res.render('links/alimentos.hbs')
    //res.send("ya casi");
});

router.get('/bebidas',(req,res)=>{
    res.render('links/bebidas.hbs')    
});

router.get('/dulces',(req,res)=>{
    res.render('links/dulces.hbs')    
});

router.get('/alcohol',(req,res)=>{
    res.render('links/alcohol.hbs')    
});
module.exports=router;