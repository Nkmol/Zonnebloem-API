let mongoose = require("mongoose");
let User = mongoose.model("User");
let BaseController = require("./../../base.controller");

class UserController extends BaseController {
    constructor() {
        super();
        this._model = User;
    }

    // get(req, res, next) {
    //     super.get(req, res, next);
        

        // Implement this in a later phase
        // let limit = req.query.limit || 10;
        // let page = req.query.page || 1;
        // let sort = req.query.sort || 'asc';
        // let sortBy = req.query.sort_by || 'created_at';

        // limit = parseInt(limit);
        // page = parseInt(page);

        // return this._model.count({})
        // .then(itemsCount => this.fetchUsers(itemsCount, limit, page, sort, sortBy))
        // .then(response => {

        //     console.log('response', response);

        //     if (!response.users) {
        //         return res.status(404).json(this._combineStatus({
        //             status: res.statusCode,
        //             message: "No users found"
        //         }));
        //     }
        //     return res.json(this._combineStatus({
        //         data: {
        //             total_count: response.itemsCount,
        //             users: response.users
        //         }
        //     }));
        // })
        // .catch(e => {
        //     console.log(e);
        // })
    // }

    // fetchUsers(itemsCount, limit, page, sort, sortBy) {
    //     let sortObj = {};
    //     sortObj[sortBy] = sort;

    //     return this._model.find({})
    //         .skip((page - 1) * limit)
    //         .limit(limit)
    //         .sort(sortObj)
    //         .then(users => {
    //             console.log('users', users);
    //             return {itemsCount, users}
    //         })
    // }

    put(req, res, next) {
        // Exclude fields from update
        delete req.body.username;
        delete req.body.password;

        super.put(req, res, next);
    }

    me(req, res, next) {
        let user = req.user;
        if (user) {
            user = user.toObject();
            delete user.password;
        }
        return res.json(this._combineStatus({data: user}));
    }
}

module.exports = new UserController();
