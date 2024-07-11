// var express     = require('express');
// var session     = require('express-session');
// var path        = require('path');
// var indexRouter = require('./routes/index');
// var authRouter  = require('./routes/auth');
// var sequelize   = require("./database");
// const passport  = require('passport');
// var app         = express();

// sequelize.sync().then(() => {
//     console.log("database is running")
// });

// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');

// app.use('/assets',express.static('assets'));


// app.use(session({ secret: "SECRETKEY", resave: true, saveUninitialized: true }));


// app.use(passport.initialize());
// app.use(passport.session());

// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/auth', authRouter);

// module.exports = app;
