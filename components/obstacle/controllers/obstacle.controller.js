let mongoose = require("mongoose");
let Obstacle = mongoose.model("Obstacle");
let BaseController = require("../../base.controller");

class ObstacleController extends BaseController {
    constructor() {
        super();
        this._model = Obstacle;
    }
}

module.exports = new ObstacleController();
