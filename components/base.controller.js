let { Mongoose, "Error": MongooseError } = require("mongoose");
let mon = require("mongoose");
let autoBind = require("./utilities").autoBind;
let ExtendableError = require("./exterror");
let Util = require("./utilities");
let Filter = require("./Filter");

// The behavior of limit() is undefined for values less than -2^31 and greater than 2^31
const maxFilter = Math.pow(2, 31);

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
        return mon.Types.ObjectId.isValid(id);
    }

    _combineStatus(toCombine = {}) {
        let response = {
            "success": (toCombine.status || this._BaseResponse.status) === 200
        };

        return Object.assign(this._BaseResponse, toCombine, response);
    }

    _createErrorMessage(error) {
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

        return this._combineStatus(error);
    }

    _errorHandler(res, error) {
        console.error(error);

        error = this._createErrorMessage(error);
       
        return res.status(error.status).json(error);
    }

    throw(msg, status) {
        throw new ResponseError(msg, status);
    }
    
    get(req, res, next) {
        
        // set filter helper object with current model and filter from querystring
        let filter = new Filter((req.filter) ? req.filter : req.params, this._model);
        let paginationOptions = {
            "page": 1,
            "limit": 50
        };

        if (req.query.limit) {
            paginationOptions.limit = parseInt(req.query.limit);
        }

        if (req.query.page) {
            paginationOptions.page = parseInt(req.query.page);
        } 
        else {
            // If paging is not used, show all results
            paginationOptions.limit = maxFilter;
        }

        if (req.query.sort) {
            paginationOptions.sort = req.query.sort;
        }

        return this._model.paginate(filter.getPreFilter(), paginationOptions)
            .then(result => {
                
                let postFiltered = result.docs.filter(model => {
                    
                    // apply filter for populated fields
                    if (filter.matched(model)) {
                        return model;
                    }
                });
                
                res.json(this._combineStatus({
                    "data": postFiltered,
                    "meta": {
                        "total": result.total,
                        "limit": result.limit,
                        "page": result.page,
                        "pages": result.pages
                    }
                }));

                return postFiltered;
               
            });
    }

    getOne(req, res, next) {
        let id = `${req.params._id}`;
        // Early exit

        if (!this._isValidId(id)) {
            let response = {
                "message": "Please provide a valid 'id'",
                "status": 400
            };

            res.status(400).json(this._combineStatus(response));
        }

        return this._model.findById(id)
            .then(doc => {
                res.json(this._combineStatus({ "data": doc }));
                return doc;
            });
    }

    create(req, res, next) {
        let model = new this._model(req.body);

        return model.save()
            .then(() => {
                return res.json(this._combineStatus({ "data": model }));
            })
            .catch(err => {
                this._errorHandler(res, err);
            });
    }

    delete(req, res, next) {
        return new Promise(resolve => {
            // Early exit
            if (!this._isValidId(req.params._id)) {
                this.throw("Please provide a valid '_id'", 400);
            }

            resolve();
        })
        .then(() => this._model.findOne(req.params))
        .then(doc => doc == null ? this.throw(`Could not find entity with ${JSON.stringify(req.params)}`, 404) : doc)
        .then(doc => doc.remove())
        .then(() => res.json(this._combineStatus()))
        .catch(err => this._errorHandler(res, err));
    }

    /*
    * PUT request
    *
    * Replaces the entity IF the entity already exists with the given id.
    * Will create a new entity when this is not true
    */
    put(req, res, next) {
        return new Promise((resolve, reject) => {
            // Early exit
            if (!this._isValidId(req.params._id)) {
                this.throw("Please provide a valid 'id'", 400);
            }
            
            if (Util.objectIsEmpty(req.body)) {
                this.throw("Please provide values with your PUT request", 204);
            }

            if (Util.objectIsEmpty(req.params)) {
                this.throw("Please provide a valid parameter to this PUT request", 400);
            }

            resolve();
        })
        .then(() => {
            // Upsert = If the _id does not exists, create a new document
            return this._model.findOneAndUpdate({ "_id": req.params._id }, req.body, { "upsert": true, "overwrite": true, "new": true });
        })
        .then(doc => {
            return res.json(this._combineStatus({ "data": doc }));
        })
        .catch(err => this._errorHandler(res, err));
    }

     /*
    * PATCH request
    *
    * Replaces the given data with an existing document
    */
    patch(req, res, next) {
        return new Promise((resolve, reject) => {
            // Early exit
            if (!this._isValidId(req.params._id)) {
                this.throw("Please provide a valid 'id'", 400);
            }
            
            if (Util.objectIsEmpty(req.body)) {
                this.throw("Please provide values with your PATCH request", 204);
            }

            if (Util.objectIsEmpty(req.params)) {
                this.throw("Please provide a valid parameter to this PATCH request", 400);
            }
            console.log(req.body);
            resolve();
        })
        .then(() => this._model.findOne({ "_id": req.params._id }))
        .then(doc => doc == null ? this.throw(`Could not find entity with ${JSON.stringify(req.params)}`, 404) : doc)
        .then(doc => {
            let newDoc = Object.assign(doc, req.body);

            return this._model.findOneAndUpdate({ "_id": req.params._id }, newDoc, { "new": true });
        })
        .then(newDoc => {
            console.log(newDoc);
            return res.json(this._combineStatus({ "data": newDoc }));
        })
        .catch(err => this._errorHandler(res, err));
    }

}

module.exports = BaseController;
