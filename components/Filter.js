let Util = require("./utilities");

module.exports = class Filter {

    constructor(filters, model) {

        this._filter = filters;
        this._model = model;
        this._excludedFields = [ "limit", "sort", "page" ];
        this._fields = []; // contains model fields which are populated
        this._referencedFields = []; // contains referenced model fields wich aren't populated before query
        this._preFilter = {};
        this._postFilter = {};
        this.setPrePostFields();
        this.setFilters();
    }

    setPrePostFields() {

        // Get fields from model and check which are referenced fields
        this._model.schema.eachPath((path, pathType) => {

            if (pathType.options.ref) {
                this._referencedFields.push(path);
            }

            else {
                this._fields.push(path);
            }
        });
    }

    setFilters() {

        Object.keys(this._filter).forEach((path) => {

            let pathSplit = path.split(".");

            // If first part of path is a normal prop or subdocument field and not in excluded 
            if (this._fields.indexOf(pathSplit[ 0 ]) > -1 && this._excludedFields.indexOf(pathSplit[ 0 ]) < 0) {
                this._preFilter[ path ] = this._filter[ path ];
            }
            
            // If first part of the path is a referenced (unpopulated) field and not excluded
            if (this._referencedFields.indexOf(pathSplit[ 0 ]) > -1 && this._excludedFields.indexOf(pathSplit[ 0 ]) < 0) {
                this._postFilter[ path ] = this._filter[ path ];
            }

        });

    }

    // Gets a filter object for mongoose query
    getPreFilter() {
        return this._preFilter;
    }

    matched(document) {

        let matched = true;

        // loop trough filter properties;
        Object.keys(this._postFilter).forEach((path) => {

            // Compare document value with filter value
            if (String(Util.deepFind(document, path)) !== this._postFilter[ path ]) {
                matched = false;
                return;
            }
        });

        return matched;

    }

};
