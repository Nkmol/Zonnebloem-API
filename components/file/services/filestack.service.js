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

    // ErrorThrower is used to map the Filestack error to the default error
    // It uses the default throw method
    // TODO: Move throw method to utility class
    removeFile(url, errorThrower = null) {
        let fileID = url.match(/\w+$/g);

        console.log(fileID);
        const options = {
            "method": "DELETE",
            "uri": this.url.delete.replace("{fileID}", fileID),
            "headers": {
                "Authorization": this.auth
            }
        };

        return rp(options)
            .catch(err => errorThrower(err.error, err.statusCode));
    }
}

module.exports = FilestackService;
