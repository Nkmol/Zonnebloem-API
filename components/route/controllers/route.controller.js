let mongoose = require("mongoose");
let Route = mongoose.model("Route");
let BaseController = require("./../../base.controller");

class RouteController extends BaseController {
    constructor() {
        super();
        this._model = Route;
    }
}

module.exports = new RouteController();