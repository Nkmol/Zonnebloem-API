let FilestackService = require("../services/filestack.service");
let BaseController = require("./../../base.controller");
let fs = require("fs-extra");

class FileController extends BaseController {
    constructor() {
        super();
        this.service = new FilestackService();
    }

    upload(req, res) {
        // Create async promise function
        let prom = (oldPath, newPath) => fs.rename(oldPath, newPath)
            .then(() => this.service.uploadFile(newPath))
            .then(data => this._combineStatus({ "data": JSON.parse(data) }))
            .catch(err => this._createErrorMessage(err))
            // Always remove the file, even if a error has occured
            .then(data => fs.remove(newPath).then(() => data));

        // Create promise array of all file post requests
        let promisesPost = req.files.map(file => prom(`${file.destination}${file.filename}`, `${file.destination}${file.originalname}`));

        // Listen to promises
        Promise.all(promisesPost)
            .then(data => {
                // Because the errors has been catched as a normal JSON error response
                // We now check for those error responses
                let errors = data.filter(x => x.status !== 200);
                console.log(errors);
                if (errors.length > 0) {
                    res.status(errors[ 0 ].status).json(data);
                }
                else {
                    res.json(data);
                }
            })
            .catch(err => this._errorHandler(res, err));
    }

    remove(req, res) {
        // Create aync promise function
        let prom = file => this.service.removeFile(file, this.throw)
            .then(fileStatus => this._combineStatus({ "message": fileStatus }))
            // Dont stop the chain of promises, just create an error response
            .catch(err => this._createErrorMessage(err));

        // Create promise array of all file remove requests
        let promisesRemove = req.body.files.map(file => prom(file));

        // Listen to array of promises
        Promise.all(promisesRemove)
            .then(data => {
                // Because the errors has been catched as a normal JSON error response
                // We now check for those error responses
                let errors = data.filter(x => x.status !== 200);

                if (errors.length > 0) {
                    res.status(errors[ 0 ].status).json(data);
                }
                else {
                    res.json(data);
                }
            })
            .catch(err => this._errorHandler(res, err));
    }
}

module.exports = new FileController();
