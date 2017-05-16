let MongooseError = require("mongoose").Error;
let autoBind = require("./utilities").autoBind;
let ExtendableError = require("./exterror");

// Not exported
class ResponseError extends ExtendableError {
    constructor(msg, status) {
        super(msg);
        this.status = status;
    }
}

class BaseController {
    constructor() {
        this._model = null;

        autoBind(this); // Bind all methods to itself
    }

    // Use a getter so the response is 'reset' on every request
    get _BaseResponse() {
        return {
            "success": true,
            "status": 200,
            "message": null,
            "data": null
        };
    }

    _isValidId(id) {
        return id && id.match(/^[0-9a-fA-F]{24}$/);
    }

    // Todo 2 times status
    _combineStatus(toCombine = {}) {
        let response = {
            "success": (toCombine.status || this._BaseResponse.status) === 200
        };

        return Object.assign(this._BaseResponse, toCombine, response);
    }

    _errorHandler(res, error) {
        console.error(error);

        // Assume this is now a MongoError
        if (error.constructor === MongooseError) {
            error = { "message": error.toString() };
        }
        
        // Any other special exception will just be shown as a string (for example a ReferenceError)
        else if (error.constructor !== Object) {
            // The message need to be called through 'Error.prototype.message'
            error = { "status": error.status, "message": error.message };
        }
            
        // Assume when the json error object has given (that is structural incorrect), that something wrong happend internally
        error.status = error.status || 500;

        return res.status(error.status).json(this._combineStatus(error));
    }

    throw(msg, status) {
        throw new ResponseError(msg, status);
    }
    
    get(req, res, next) {
        return this._model.find(req.params)
            .then(doc => {
                res.json(this._combineStatus({ "data": doc }));
                return doc;
            });
    }

    getOne(req, res, next) {
        // Early exit
        if (!this._isValidId(req.params.id)) {
            let response = {
                "message": "Please provide a valid 'id'",
                "status": 400
            };

            res.status(400).json(this._combineStatus(response));
        }
    }

    create(req, res, next) {
        let model = new this._model(req.body);
        
        return model.save()
            .then(() => {
                return res.json(this._combineStatus());
            })
            .catch(err => {
                this._errorHandler(res, err);
            });
    }

    update(req, res, next) {
        // Early exit
        if (!this._isValidId(req.params.id)) {
            let response = {
                "message": "Please provide a valid 'id'",
                "status": 400
            };

            res.status(400).json(this._combineStatus(response));
        }
    }

    delete(req, res, next) {
        // Early exit
        if (!this._isValidId(req.params.id)) {
            let response = {
                "message": "Please provide a valid 'id'",
                "status": 400
            };

            res.status(400).json(this._combineStatus(response));
        }
    }
}

module.exports = BaseController;
