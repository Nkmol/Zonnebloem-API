/**
 * @api {post} /files Upload File
 * @apiVersion 0.0.1
 * @apiName Post
 * @apiGroup File
 *
 * @apiuse JwtHeader
 * @apiHeader Content-Type multipart/form-data
 *
 * @apiParam {MultipartFile} file The file to be uploaded
 *
 * @apiUse Response
 * @apiSuccess {Object} data
 * @apiSuccess {String} .url Url to the uploaded file
 * @apiSuccess {Integer} .size
 * @apiSuccess {String} .type
 * @apiSuccess {String} .filename original filename that was used to upload the file
 */

/**
 * @api {delete} /files Remove File
 * @apiVersion 0.0.1
 * @apiName Remove
 * @apiGroup File
 *
 * @apiuse JwtHeader
 *
 * @apiDescription This can be really useful for cleaning the asset cloud once you not in need of certain assets anymore
 *
 * @apiParam {String[]} String of the links you want to delete
 *
 * @apiParamExample {json} Request-Example:
 *     {
 *       "files": [
 *          "https://cdn.filestackcontent.com/J8NpRMT2TvuvyiyobRMA",
 *          "https://cdn.filestackcontent.com/rxMQqQHSzsgV3MfVdVgg"
 *       ]
 *     }
 *
 * @apiUse Response
 * @apiSuccess {String[]} data Array of string that indicates for each request if it succeeded ("success"/"failed")
 *
 * @apiSuccessExample {json} Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "success": true,
 *          "status": 200,
 *          "message": null,
 *          "data": [
 *              "success",
 *              "success"
 *          ]
 *      }
 */
