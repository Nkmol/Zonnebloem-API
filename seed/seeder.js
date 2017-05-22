let seeder = require("mongoose-seed");
let glob = require("glob-promise");
let config = require("../components/config/config");

let data = [
    require("./departments.json"),
    require("./users.json"),
    require("./obstacles.json"),
    require("./routes.json"),
    require("./regions.json"),
    require("./reports.json")

];

seeder.connect(config.db.uri, () => {

    glob(config.models)
        .then(modelPaths => {
            seeder.loadModels(modelPaths);

            seeder.clearModels([ "Department", "User", "Obstacle", "Route", "Region", "Report" ], () => {
                seeder.populateModels(data, () => { });
            });
        });
});
