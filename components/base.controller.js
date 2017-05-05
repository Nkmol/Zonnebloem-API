let mongoose = require('mongoose'),
    chalk = require('chalk'),
    autoBind = require('auto-bind');

class BaseController {
    constructor() {
        this._BaseResponse = {
            success: true,
            status: 200,
            message: null,
            data: null,
        }
        this._model = null;

        autoBind(this); // Bind all methods to itself
    }

    _isValidId(id) {
        return id && id.match(/^[0-9a-fA-F]{24}$/);
    }

    // Todo 2 times status
    _combineStatus(toCombine) {
        let response = {
            success: toCombine.status == 200
        }

        return Object.assign(this._BaseResponse, toCombine, response);
    }

    throw(msg, status) {
        throw {
            message: msg,
            status: status
        }
    }
    
    get(req, res, next) {
        return this._model.find(req.params)
            .then(doc => {
                res.json(this._combineStatus({data: doc}));
                return doc;
            });
    }

    getOne(req, res, next) {
        // Early exit
        if(!this._isValidId(req.params.id)) {
            let response = {
                message: `Please provide a valid 'id'`, 
                status: 400
            }

            res.status(400).json(this._combineStatus(response));
        }

    }
}

module.exports = BaseController;