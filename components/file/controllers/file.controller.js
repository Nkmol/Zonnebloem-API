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
        let seq = (oldPath, newPath) => fs.rename(oldPath, newPath)
            .then(() => this.service.uploadFile(newPath))
            .then(data => this._combineStatus({ "data": JSON.parse(data) }))
            .catch(err => this._errorHandler(res, err))
            // Always remove the file, even if a error has occured
            .then(data => fs.remove(newPath).then(() => data));

        // Create promise array of all file post requests
        let promisesPost = req.files.map(file => seq(`${file.destination}${file.filename}`, `${file.destination}${file.originalname}`));

        // Listen to promises
        Promise.all(promisesPost)
            .then(data => res.json(data))
            .catch(err => this._errorHandler(res, err));
    }

    remove(req, res) {
        // Create promise array of all file remove requests
        let promisesRemove = req.body.files.map(x => this.service.removeFile(x, this.throw));

        Promise.all(promisesRemove)
            .then(data => res.json(this._combineStatus({ "data": data })))
            .catch(err => { 
                console.log(err);
                this._errorHandler(res, err);
            });
    }
}

module.exports = new FileController();
