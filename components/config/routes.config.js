

class RoutesConfigurator {

    constructor(app) {
        this.app = app;
    }

    configureRoutes() {
         let UserController = require('../user/controllers/user.controller');
         let JWTAuthenticator = require('../passport/middlewares');
        // TODO: Check if this can be done in a better way
        this.app.post('/login', 
            UserController.isLoggedIn.bind(UserController), 
            UserController.login.bind(UserController));
        this.app.post('/register', 
            UserController.isLoggedIn.bind(UserController), 
            UserController.register.bind(UserController));
            // TODO: Use unless function to authenticate with JWT
        this.app.get('/me', 
            JWTAuthenticator.authenticate.bind(JWTAuthenticator), 
            UserController.me.bind(UserController));
    }

}

module.exports = RoutesConfigurator;