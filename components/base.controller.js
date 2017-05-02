let mongoose = require('mongoose'),
    chalk = require('chalk');

class BaseController {
    constructor() {
        this._BaseResponse = {
            success: true,
            status: 200,
            message: null,
            data: null,
        }
        this._model = null;
    }

    _isValidId(id) {
        return id && id.match(/^[0-9a-fA-F]{24}$/);
    }

    _combine(toCombine) {
        console.log(Function.caller);
        return Object.assign(this._BaseResponse, toCombine);
    }

    get(req, res, next) {
        return this._model.find(req.params)
            .then(doc => {
                res.json(this._combine({data: doc}));
                return doc;
            });
    }

    getOne(req, res, next) {
        // Early exit
        if(!this._isValidId(req.params.id));
            res.status(400).json(this._combine({message: `Please provide a valid 'id'`}));
    }
}

module.exports = BaseController;