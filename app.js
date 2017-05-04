let express = require('express'),
    path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    chalk = require('chalk'),

    mongoose = require('./components/database/mongoose'),
    util = require('./components/utilities'),
    config = require('./components/config/config'),
    
    passport = require('passport'),
    PassportJWT = require('./components/passport/jwt');

let app = express();

module.exports = app;

module.exports.start = () => {
  mongoose.connect()
    .then(() => {
      // Load models
      console.log(chalk.green('Loading models...'));
      return util.requireAll(config.models)
        .then(() => console.log(chalk.green('Loaded all models')));
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
    })
    .then(() => {
      new PassportJWT(passport);
    })
    .then(() => {
      // Setup routing
      console.log(chalk.green('Setting up routers'));

      let RoutesConfigurator = require('./components/config/routes.config');
      let routesConfigurator = new RoutesConfigurator(app);
      routesConfigurator.configureRoutes();
     
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
    .then(() => console.log(chalk.green('done!')))
    .catch(err => {
      console.error(chalk.red(err));
    })
  };
