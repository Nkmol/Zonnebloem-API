module.exports = function filter() {

    return (req, res, next) => {

        let filter = {};

        req.filter = req.query;

        next();
    };
};
