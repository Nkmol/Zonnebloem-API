let glob = require("glob-promise");
let chalk = require("chalk");
 // Use to require relative to the root path
let rootRequire = require("rfr");

// Require with promise for multiple file + glob support
exports.requireAll = (globPath, debug = true) => {
    return glob(globPath, { "relative": true })
        .then((files) => {
            // use .map() so we can iterate through the files and make a Promise of every file request.
            // use Promise.all to make a chain of promises of all file requests
            return Promise.all(files.map((file) => exports.requirePromise(file)));
        })
        .catch((err) => console.error(chalk.red(`Something went wrong when loading file(s): ${err}`)));
};

// Require with a promise for one file
exports.requirePromise = (file, debug = true) => {
    return new Promise((resolve, reject) => {
        try {
            let promise = rootRequire(`./${file}`);
                
            if (debug) {
                console.log(chalk.green(`   Loaded file: ${file}`));
            }

                // Check for empty object + check if promise
            if (promise != null || Object.keys(promise).length > 0 && promise.constructor === Promise) {
                resolve(promise);
            }

        }
        catch (e) {
            throw new Error(`${e } [${file}]`);
        }
    });
};

// Name is entity name
// Type is Controller || Route || Seed || Model
// @Return the requested module
exports.LoadComponent = function(nameComponent, typeComponent) {
    let isValidType = [ "route", "seed", "model", "controller" ].indexOf(typeComponent.toLowerCase()) > 0;

    if (!isValidType) {
        throw new Error("This type component does not exist.");
    }

    let component = nameComponent.toLowerCase();
    let type = typeComponent.toLowerCase();

    let path = `./components/${component}/${type}s/${component}.${type}`;

    console.log(chalk.green(`   Loaded ${type}: ${path}`));
    return rootRequire(path);
};
