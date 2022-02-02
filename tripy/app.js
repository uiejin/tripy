var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var myplanRouter = require('./routes/myplan');
var mytourRouter = require('./routes/mytour');
var mypostRouter = require('./routes/mypost');
var writepostRouter = require('./routes/writepost');
var boardRouter = require('./routes/board');
var managimentRouter = require('./routes/managiment');
var tourlistRouter = require('./routes/tourlist');

var loginRouter = require('./routes/login');
var profileRouter = require('./routes/profile');

var seventeenRouter = require('./routes/seventeen');

var testforphotoRouter = require('./routes/testforphoto');
var uploadRouter = require('./routes/upload');

//phaser router

var phaserRouter = require('./routes/pharser');

var passport = require('passport');

var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);

var options = {
  host: 'localhost',
  user: 'root',
  password: process.env.PASSWORD,
  database: 'party'
};

var sessionStore = new MySQLStore(options);

var app = express();

app.use(session({
  key: "M7a6s5t4e3r2z1Key@NAME",
  secret: '@Tripy',
  resave: false,
  store: sessionStore,
  saveUninitialized: true,
  rolling: true, // <-- Set `rolling` to `true`
  cookie: {
    maxAge: 1*60*60*1000
  }
}));


app.use(passport.initialize());
app.use(passport.session());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static('public'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// prepare server 
app.use('/', express.static(__dirname + '/www')); // redirect root 
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS 
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jQuery 
app.use(express.static(__dirname + '/js'));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/myplan', myplanRouter);
app.use('/mytour', mytourRouter);
app.use('/mypost', mypostRouter);
app.use('/writepost', writepostRouter);
app.use('/board', boardRouter);
app.use('/tourlist', tourlistRouter);
app.use('/test', testforphotoRouter);
app.use('/upload', uploadRouter);

//phaser 사용으로 임시 경로 변경
app.use('/login', loginRouter);
//
app.use('/board/managiment', managimentRouter);
app.use('/users/profile', profileRouter);


//phaser router

//app.use('/phaserExample', phaserRouter);


//다비수 디지털 페이저 예제 201221
app.use('/pharser', phaserRouter);


app.use('/seventeen', seventeenRouter);


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
