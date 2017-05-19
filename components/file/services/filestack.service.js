let config = require("../../config/config");
let rp = require("request-promise");
let fs = require("fs");

class FilestackService {
    constructor() {
        this.url = { };
        this.url.upload = `https://www.filestackapi.com/api/store/S3?key=${config.filestack.key}`;
        this.url.delete = `http://www.filestackapi.com/api/file/{fileID}?key=${config.filestack.key}`;
        this.auth = `Basic ${config.filestack.base64policy}`;
    }

    uploadFile(file) {
        const options = {
            "method": "POST",
            "uri": this.url.upload,
            "formData": {
                "fileUpload": fs.createReadStream(file)
            }
        };

        return rp(options);
    }
}

module.exports = FilestackService;
