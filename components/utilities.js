let glob = require('glob-promise'),
    chalk = require('chalk'),
    rootRequire = require('rfr'); // Used to require relative to the root path

// Require with promise for multiple file + glob support
exports.requireAll = (globPath, debug = true) => {
    return glob(globPath, {relative: true})
        .then(files => {
            // use .map() so we can iterate through the files and make a Promise of every file request.
            // use Promise.all to make a chain of promises of all file requests
            return Promise.all(files.map(file => exports.requirePromise(file)));
        })
        .catch(err => console.error(chalk.red(`Something went wrong when loading file(s): ${err}`)))
}

// Require with a promise for one file
exports.requirePromise = (file, debug = true) => {
    return new Promise((resolve, reject) => {
        try {
                let promise = rootRequire(`./${file}`);
                
                if(debug)
                    console.log(chalk.green(`   Loaded file: ${file}`));

                // Check for empty object + check if promise
                if(promise != null || Object.keys(promise).length > 0 &&
                        promise.constructor === Promise) 
                    resolve(promise);

            } catch (e) {
                throw e + ` [${file}]`;
                reject(e + ` [${file}]`);
            }
    })
}