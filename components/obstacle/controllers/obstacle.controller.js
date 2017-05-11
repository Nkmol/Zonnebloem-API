let BaseController = require('./../../base.controller');
let mongoose = require('mongoose');
let Obstacle = mongoose.model('Obstacle');

class ObstacleController extends BaseController {
    constructor() {
        super();
        this._model = Obstacle;
    }
}

module.exports = new ObstacleController();