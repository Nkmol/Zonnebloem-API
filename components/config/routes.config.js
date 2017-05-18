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

    }

}

module.exports = RoutesConfigurator;
