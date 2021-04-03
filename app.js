var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var projectsRouter = require('./routes/projects'); /*projects reference*/
var categoriesRouter = require('./routes/categories'); /*categories reference*/

//PASSPORT CONFIG
const passport = require('passport')
const session = require('express-session')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//configure SESSION before map controllers
app.use(session({
    secret: '1t1sGr33n44p',
    resave: false,
    saveUninitialized: false
}))

//configure PASSPORT
app.use(passport.initialize())
app.use(passport.session())

//Link passport to Model
const User = require('./models/user')
passport.use(User.createStrategy())

//SERIALIZE AND DESERIALIZE
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/projects', projectsRouter); /*projects*/
app.use('/categories', categoriesRouter); /*categories*/

//mongodb connection
const mongoose = require('mongoose')

// vars into config
const config = require('./config/globals')

mongoose.connect(config.db, {
    useNewUrlParser : true,
    useUnifiedTopology: true
})

.then((res) =>{
  console.log('Connected to Mongo DB')
}).catch(() => {
  console.log('MongoDB Connection Failed')
})

// hbs helper function to pre-select correct dropdown option
const hbs = require('hbs')

hbs.registerHelper('createOption', (currentValue, selectedValue) => {
    // if values match add 'selected' to this option tag
    var selectedProperty = ''
    if (currentValue == selectedValue) {
        selectedProperty = ' selected'
    }

    console.log(currentValue + '/' + selectedValue)
    return new hbs.SafeString('<option' + selectedProperty + '>' + currentValue + '</option>')
})

hbs.registerHelper('shortDate', (dateVal) => {
    return new hbs.SafeString(dateVal.toLocaleDateString('en-US'))
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
