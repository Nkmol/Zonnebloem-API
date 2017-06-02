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

let sharedGuards = {
    me: {
        key: "adjust user",
        action: (req) => {
            if (req.params._id == req.user._id) return true;
        }
    }
}

let roles = new ConnectRoles(rolesOptions);

module.exports = {sharedGuards, roles}
