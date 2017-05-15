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
    _combineStatus(toCombine) {
        let response = {
            "success": (toCombine.status || this._BaseResponse.status) === 200
        };

        return Object.assign(this._BaseResponse, toCombine, response);
    }

    _errorHandler(res, error) {
        // Assume this is now a MongoError
        if (error.constructor === Error) {
            let mongoError = this._createMongoError(error);

            // create new object (will be restructured according the _BaseResponse as expected)
            error = {};
            error.mongo = mongoError;
        }
        
        // Any other special exception will just be shown as a string (for example a ReferenceError)
        else if (error.constructor !== Object) {
            // The message need to be called through 'Error.prototype.message'
            error = { "status": error.status, "message": error.message };
        }
            
        console.log(error);
        // Assume when the json error object has given (that is structural incorrect), that something wrong happend internally
        error.status = error.status || 500;

        return res.status(error.status).json(this._combineStatus(error));
    }

    _createMongoError(errorMongo) {
        errorMongo = errorMongo.toJSON();

        // Delete properties then we do not want to expose
        delete errorMongo.op;
        delete errorMongo.index;

        return errorMongo;
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
