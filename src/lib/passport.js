const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const pool = require('../database');
const helpers = require('../lib/helpers');
//puedo crear ahora las autenticaciones
passport.use('local.signin',new LocalStrategy({
    usernameField: 'correoSesion',
    passwordField: 'contraSesion',
    passReqToCallback: true
},async (req,CorreoSesion,contraSesion,done)=>{
    const rows = await pool.query('SELECT * FROM cliente WHERE Correo = ?',[CorreoSesion]);
    if(rows.length > 0){
        console.log(rows);
        const user = rows[0];        
        const contraValida = await helpers.comparaClave(contraSesion,user.clave);
        console.log(contraValida);
        if(contraValida){            
            done(null,user,req.flash('success','Inicio sesion'));            
        }else{
            done(null,false,req.flash('message','Ingreso mal la contra'));            
        }
    }else{
        return done(null,false,req.flash('message','No existe usuario. Inicie sesion'));
    }

}));
passport.use('local.signup',new LocalStrategy({
    usernameField: 'Correo',
    passwordField: 'clave',
    passReqToCallback: true
}, 
    async (req,Correo,clave,done)=>{
        //console.log(req.body);
        //deconstruccion
        const {Nombre,Celular,Direccion}=req.body;
        //creo nuevo objeto
        let nuevoCliente={
            Nombre,
            Celular,
            Direccion,
            Correo,
            clave
        };    
        nuevoCliente.clave = await helpers.encriptaClave(clave);        
        const resultado = await pool.query('INSERT INTO cliente SET ?',nuevoCliente);        
        nuevoCliente.idCliente = resultado.insertId;
        console.log(resultado);
        return done(null,nuevoCliente);
}));

passport.serializeUser((user,done)=>{
    done(null,user.idCliente);
});

passport.deserializeUser(async (id,done)=>{
    const rows = await pool.query('SELECT * FROM cliente WHERE idCliente = ?',id);
    done(null, rows);
});
