let filterMiddleware = function filter(fields) {

    if (!Array.isArray(fields)) {
        console.log("ERROR");
    }

    return (req, res, next) => {

        let filter = {};

        // Loop trough querystring parameters
        for (const key in req.query) {

            // Only allow filterable fields
            if (fields.indexOf(key) > -1) {
                filter[ key ] = req.query[ key ];
            }
        }

        req.filter = filter;

        next();
    };
};

module.exports = filterMiddleware;
