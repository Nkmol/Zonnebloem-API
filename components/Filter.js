let Util = require("./utilities");

module.exports = class Filter {

    constructor(filters, model) {

        this._filter = filters;
        this._model = model;
        this._paths = {};
        this._excludedFields = [ "limit", "sort", "page" ];
        this._preFilters = [];
        this._postFilters = [];
        this.setPrePostFields();
    }

    setPrePostFields() {

        // Get reference props
        this._model.schema.eachPath((path, pathType) => {

            if (pathType.options.ref) {
                this._postFilters.push(path);
            }

            else {
                this._preFilters.push(path);
            }
        });
    }

    getPreFilter() {

        let filter = {};

        Object.keys(this._filter).forEach((path) => {

            let pathSplit = path.split(".");

            if (this._preFilters.indexOf(pathSplit[ 0 ]) > -1 && this._excludedFields.indexOf(pathSplit[ 0 ]) < 0) {
                filter[ path ] = this._filter[ path ];
            }

        });

        return filter;

    }

    getPostFilter(model) {

        let filter = {};
        let matched = true;

        Object.keys(this._filter).forEach((key) => {

            let pathSplit = key.split(".");

            if (this._postFilters.indexOf(pathSplit[ 0 ]) > -1 && this._excludedFields.indexOf(pathSplit[ 0 ]) < 0) {
                filter[ key ] = this._filter[ key ];
            }

        });

        Object.keys(filter).forEach((key) => {

            if (Util.deepFind(model, key) !== filter[ key ]) {
                matched = false;
                return;
            }
        });

        return matched;

    }

};
