let mongoose = require("mongoose");
let Department = mongoose.model("Department");
let BaseController = require("./../../base.controller");

class DepartmentController extends BaseController {
    constructor() {
        super();
        this._model = Department;
    }
}

module.exports = new DepartmentController();