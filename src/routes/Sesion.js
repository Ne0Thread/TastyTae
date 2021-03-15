const express = require('express');
const router = express.Router();
const passport = require('passport');

//pool es la coneccion a la base de datos
const pool = require('../database');
//cuando acceda a esa direccion hace
router.get('/registroSesion',(req, res) =>{
    res.render('links/registrasesion.hbs');    
});

router.post('/registroSesion', passport.authenticate('local.signup',{
    successRedirect: '/',
    failurRedirect: '/registroSesion',
    failureFlash: true
}));


router.get('/profile',(req,res)=>{
    res.send('Se logueocorrecta');
})
router.get('/inicioSesion',(req, res) =>{
    res.render('autentificacion/iniciasesion.hbs');    
});
router.post('/inicioSesion',(req,res,next)=>{   
    passport.authenticate('local.signin',{
         successRedirect: '/',
         failurRedirect: '/inicioSesion',
         failureFlash: true
    })(req,res,next);
});
router.get('/falloses',(req,res)=>{
    res.send('No inicio sesion');
});

module.exports=router;

