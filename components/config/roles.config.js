let User = require('../user/models/user.model');
let ConnectRoles = require('connect-roles');
let rolesOptions = {
    async: true,
    failureHandler: (req, res, action) => {
        res.status(403);
        res.json({
            status: res.statusCode,
            message: 'Access Denied - You don\'t have permission to: ' + action
        });
    }
}

module.exports =   new ConnectRoles(rolesOptions);
