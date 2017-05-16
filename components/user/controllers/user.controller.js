let mongoose = require("mongoose");
let User = mongoose.model("User");
let BaseController = require("./../../base.controller");
let jwt = require("jsonwebtoken");
let JWTConfig = require("./../../config/config").jwt;

class UserController extends BaseController {
    constructor() {
        super();
        this._model = User;
    }

    get _BaseResponse() {
        // Extend baseresponse with default token value
        return Object.assign(super._BaseResponse, {
            "token": null
        });
    }

    get(req, res, next) {
        super.get(req, res, next);
        

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
    }

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

    getOne(req, res, next) {
        super.getOne(req, res, next);
        let id = req.params.id;

        this._model.findById(id)
        .then(doc => {
            if (!doc) {       
                return res.status(404).json(this._combineStatus({
                    status: res.statusCode,
                    message: "User does not exist"
                }))
            }
            return res.json(this._combineStatus({data: doc}));
        }).catch(e => {
            
        })
    }

    create(req, res, next) {
        super.create(req, res, next);

        let body = req.body;

        return new Promise((resolve, reject) => {
            // Check input
            if (!(body.username && body.password && body.email)) {
                this.throw("Please provide all the fields required 'username', 'password' and 'email'", 400);
            }

            resolve();
        })
        // @ts-ignore
        .then(() => this._model.generateHash(body.password))
        .then(hash => {
            body.password = hash;
            body.roles = null; // TODO: add a default role when creating a new user

            let user = new User(body);

            return user.save();
        })
        .then(doc => {
            if (!doc) {       
                return res.status(400).json(this._combineStatus({
                    status: res.statusCode,
                    message: "User not created"
                }))
            }
            return res.status(201).json(this._combineStatus({data: doc}));
        })
        .catch(e => {
            
        })
    }

    update(req, res, next) {
        super.update(req, res, next);

        let id = req.params.id;
        let body = req.body;
    
        // Exclude fields from update
        delete body.username;
        delete body.password;

        this._model.findByIdAndUpdate(id, { $set: body}, { new: true })
        .then(doc => {
            return res.json(this._combineStatus({data: doc}));
        })
        .catch(e => {
            // TODO: handle errors
        })
    }

    delete(req, res, next) {
        super.delete(req, res, next);
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
