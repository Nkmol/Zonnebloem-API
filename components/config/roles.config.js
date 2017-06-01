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

let guards = {
    onlyMe: {
        key: "adjust user",
        action: (req) => {
            if (req.params._id == req.user._id) return true;
        }
    },
    admin: {
        key: "admin",
        action: (req) => {
            let userId = req.params._id;
            let me = req.user;
            return User.findById(userId).then(doc => {
                let isAdmin = false;
                if ((doc.roles && me.roles) && (doc.roles.length > 0 && me.roles.length > 0)) {
                    doc.roles.forEach(function(userRole) {
                        me.roles.forEach(function(myRole) {
                            if ((userRole.department._id.equals(myRole.department._id)) && myRole.role == "ADMIN") {
                                isAdmin = true;
                            }
                        })
                    });
                }
                if (isAdmin) return true;
            })
            .catch(e => {
                console.log('error', e);
            })
        }
    },
    superAdmin: {
        key: "super admin",
        action: (req) => {
            let user = req.user;
            if (user.roles && user.roles.length > 0) {
                let isSuperAdmin = false;
                user.roles.forEach(function(userRole) {
                    if (userRole.role == "SUPER-ADMIN") {
                        isSuperAdmin = true;
                    }
                });
                if (isSuperAdmin) return true;
            }
        }
    }
}

let roles = new ConnectRoles(rolesOptions);

module.exports = {guards, roles}
