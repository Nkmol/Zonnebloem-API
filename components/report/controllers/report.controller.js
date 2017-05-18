let mongoose = require("mongoose");
let Report = mongoose.model("Report");
let BaseController = require("./../../base.controller");

class ReportController extends BaseController {
    constructor() {
        super();
        this._model = Report;
    }
}

module.exports = new ReportController();