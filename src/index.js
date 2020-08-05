const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session); // Para tener una sesión persistente aún cuando reinicie el servidor
const connectDB = require('./config/db');

dotenv.config({path: path.join(__dirname, '/config/config.env')});

// Inicializando express y DB
const app = express();
connectDB();

// Settings
require('./config/passport')(passport); // Configuración de Passport
const {formatDate, stripTags, truncate, editIcon, select} = require('./helpers/hbs'); // Helpers para las views
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    helpers: {
        formatDate,
        stripTags,
        truncate,
        editIcon,
        select
    },
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

// Middlewares
app.use(express.urlencoded({extended: false}));
app.use(express.json());
if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}
app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      // look in urlencoded POST bodies and delete it
      let method = req.body._method
      delete req.body._method
      return method
    }
}));
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({mongooseConnection: mongoose.connection})
}));
app.use(passport.initialize());
app.use(passport.session());

// Global variables
app.use(function(req, res, next) {
    res.locals.user = req.user;
    next();
})

// Static folder
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', require('./routes/index.routes'));
app.use('/stories', require('./routes/stories.routes'));
app.use('/auth', require('./routes/auth.routes'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Servidor en ${process.env.NODE_ENV} mode, en el puerto: ${PORT}.`));
