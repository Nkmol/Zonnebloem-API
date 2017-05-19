let util = require("../utilities");
let JWTAuthenticator = require("../passport/middlewares");

class RoutesConfigurator {

    constructor(app) {
        this.app = app;
    }

    configureRoutes() {
        
        /** Authentication **/
        let LoginController = util.loadComponent("login", "controller");
        
        this.app.post("/login",
            LoginController.isLoggedIn,
            LoginController.login);
        this.app.post("/register",
            LoginController.isLoggedIn,
            LoginController.register);
        
        /** File */
        this.app.use("/files",
            JWTAuthenticator.authenticate,
            util.loadComponent("file", "route"));

        /** User **/
        this.app.use("/users",
            JWTAuthenticator.authenticate,
            util.loadComponent("user", "route"));

        /** Obstacle **/
        this.app.use("/obstacles",
            JWTAuthenticator.authenticate,
            util.loadComponent("obstacle", "route"));
            
        /** Department **/
        this.app.use('/departments',
            JWTAuthenticator.authenticate,
            util.loadComponent("department", "route"));

        /** Report **/
        this.app.use('/reports',
            JWTAuthenticator.authenticate,
            util.loadComponent("report", "route"));

        /** Report **/
        this.app.use('/routes',
            JWTAuthenticator.authenticate,
            util.loadComponent("route", "route"));

    }

}

module.exports = RoutesConfigurator;
