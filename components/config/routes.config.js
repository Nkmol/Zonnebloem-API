let util = require("../utilities");

class RoutesConfigurator {

    constructor(app) {
        this.app = app;
    }

    configureRoutes() {
        let UserController = require("../user/controllers/user.controller");
        let JWTAuthenticator = require("../passport/middlewares");

        this.app.post("/login",
            UserController.isLoggedIn,
            UserController.login);
        this.app.post("/register",
            UserController.isLoggedIn,
            UserController.register);

        // TODO: Use unless function to authenticate with JWT
        this.app.get("/me",
            JWTAuthenticator.authenticate,
            UserController.me);

        // Obstacle
        let ObstacleController = util.loadComponent("obstacle", "controller");

        this.app.get("/obstacles",
            JWTAuthenticator.authenticate,
            ObstacleController.get);
    }

}

module.exports = RoutesConfigurator;
