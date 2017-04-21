let express = require('express'),
    path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    chalk = require('chalk'),
    mongoose = require('./components/database/mongoose'),
    util = require('./components/utilities');

var index = require('./routes/index');
var users = require('./routes/users');

let app = express();

module.exports = app;

module.exports.start = () => {
  mongoose.connect()
    .then(() => {
      // Load models
      console.log(chalk.green('Loading models...'));
      return util.requireAll('components/**/models/*.model.js');
    })
    .then(() => {
      // view engine setup
      app.set('views', path.join(__dirname, 'views'));
      app.set('view engine', 'hbs');

      // uncomment after placing your favicon in /public
      //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
      app.use(logger('dev'));
      app.use(bodyParser.json());
      app.use(bodyParser.urlencoded({ extended: false }));
      app.use(cookieParser());
      app.use(require('node-sass-middleware')({
        src: path.join(__dirname, 'public'),
        dest: path.join(__dirname, 'public'),
        indentedSyntax: true,
        sourceMap: true
      }));
      app.use(express.static(path.join(__dirname, 'public')));

      // catch 404 and forward to error handler
      app.use((req, res, next) => {
        const err = new Error('Not Found');
        err.status = 404;
        next(err);
      });

      // error handler
      app.use((err, req, res, next) => {
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};

        // render the error page
        res.status(err.status || 500);
        res.render('error');
      });  
    })
    .then(() => {
      // Setup routing
      app.use('/', index);
      app.use('/users', users);
    })
  };
