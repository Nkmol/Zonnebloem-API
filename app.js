let express = require("express");
let path = require("path");
let favicon = require("serve-favicon");
let logger = require("morgan");
let cookieParser = require("cookie-parser");
let bodyParser = require("body-parser");
let chalk = require("chalk");
let cors = require("cors");

let mongoose = require("./components/database/mongoose");
let util = require("./components/utilities");
let config = require("./components/config/config");

let passport = require("passport");


let app = express();

let start = () => {
    mongoose.connect()
    .then(() => {
      // Load models
        console.log(chalk.green("Loading models..."));
        return util.requireAll(config.models)
        .then(() => console.log(chalk.green("Loaded all models")));
    })
    .then(() => {
        app.use(express.static("doc"));

      // view engine setup
        app.set("views", path.join(__dirname, "views"));
        app.set("view engine", "hbs");

      // uncomment after placing your favicon in /public
      // app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
        app.use(logger("dev"));
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ "extended": false }));
        app.use(cookieParser());
        app.use(require("node-sass-middleware")({
            "src": path.join(__dirname, "public"),
            "dest": path.join(__dirname, "public"),
            "indentedSyntax": true,
            "sourceMap": true
        }));
        app.use(express.static(path.join(__dirname, "public")));
        app.use(cors());
    })
    .then(() => {
      // Setup routing
        console.log(chalk.green("Setting up routers"));

       // initialize passport
        app.use(passport.initialize());
        require("./components/passport/jwt"); // implement JWT strategy

        let RoutesConfigurator = require("./components/config/routes.config");
        let routesConfigurator = new RoutesConfigurator(app);

        routesConfigurator.configureRoutes();
     
      // catch 404 and forward to error handler
        app.use((req, res, next) => {
            const err = new Error("Not Found");

            err.status = 404;
            next(err);
        });

      // error handler
        app.use((err, req, res, next) => {
        // set locals, only providing error in development
            res.locals.message = err.message;
            res.locals.error = req.app.get("env") === "development" ? err : {};

        // render the error page
            res.status(err.status || 500);
            res.render("error");
        });
    })
    .then(() => console.log(chalk.green("done!")))
    .catch(err => console.error(chalk.red(err)));
};

module.exports = {
    app,
    start
};

