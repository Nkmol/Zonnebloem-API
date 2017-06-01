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

let guards = {
    onlyMe: {
        key: "adjust user",
        action: (req) => {

        }
    },
    admin: {
        key: "admin",
        action: (req) => {

        }
    },
    superAdmin: {
        key: "super admin",
        action: (req) => {

        }
    }
}

module.exports = new ConnectRoles(rolesOptions);
