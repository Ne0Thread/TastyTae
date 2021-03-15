  
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const exphbs = require('express-handlebars');
const session = require('express-session');
const validator = require('express-validator');
const passport = require('passport');
const flash = require('connect-flash');
const MySQLStore = require('express-mysql-session');
const bodyParser = require('body-parser');

const { database } = require('./keys');

//inicializar

//inicia express
const app = express();
require('./lib/passport');

//Configuraciones ej puerto de conexion
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs',exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'),'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}))
app.set('view engine','.hbs');

//middlewares se ejecutan en cada peticiones de los clientes
app.use(session({
    secret: 'asu',
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore(database)
}));
app.use(flash());
app.use(morgan('dev'));
//acepta los datos que envien los usuarios por  formularios
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

//Variables globales 
app.use((req,res,next)=>{
    app.locals.success = req.flash('success');
    app.locals.message = req.flash('message');
    next();
});


//rutas urls del servidor

app.use(require('./routes/index'));
app.use(require('./routes/Sesion'));
app.use(require('./routes/productos'));
//public (Codigo que el navegador puede acceder)
app.use(express.static(path.join(__dirname,'public')));

//Inicia el servidor
app.listen(app.get('port'), ()=>{
    console.log('Servidor en port', app.get('port'));
})
