let seeder = require('mongoose-seed'),
    glob = require('glob-promise'),
    config = require('../components/config/config');

var data = [
    require('./departments.json'),
    require('./users.json'),
    require('./obstacles.json'),
    require('./routes.json'),
    require('./regions.json'),
    require('./reports.json')

];

seeder.connect(config.db.uri, () => {

    glob(config.models)
        .then(modelPaths => {
            seeder.loadModels(modelPaths);

            seeder.clearModels(['Department', 'User', 'Obstacle', 'Route', 'Region', 'Report'], function () {
                seeder.populateModels(data, () => { });
            });
        });
});