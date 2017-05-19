let FilestackService = require("../services/filestack.service");
let BaseController = require("./../../base.controller");
let fs = require("fs-extra");

class FileController extends BaseController {
    constructor() {
        super();
        this.service = new FilestackService();
    }

    upload(req, res) {
        let file = req.file;
        let newPath = `${file.destination}${file.originalname}`;
        
        fs.rename(`${file.destination}${file.filename}`, newPath)
            .then(() => this.service.uploadFile(newPath))
            .then(data => res.json(this._combineStatus({ "data": JSON.parse(data) })))
            .catch(err => this._errorHandler(res, err));
    }

    remove(req, res) {

    }
}

module.exports = new FileController();
