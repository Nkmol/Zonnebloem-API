/**
 * @api {none} / Model Structure
 * @apiVersion 0.0.1
 * @apiName Model
 * @apiGroup Report
 *
 * @apiDeprecated This is only used to define the model.
 *
 * @apiSuccess (Model Autogenerated) {String} _id MongoID this is autogenerated depending on the HTTP method
 * @apiSuccess (Model Autogenerated) {String} updated_at Indicated when the document has been updated
 * @apiSuccess (Model Autogenerated) {String} created_at Indicated when the document has been created
 * @apiSuccess (Model) {String} title
 * @apiSuccess (Model) {String} description
 * @apiSuccess (Model) {User} [created_by]
 * @apiSuccess (Model) {Obstacle[]} [obstacles] Array of <a href="#api-Obstacle-Model">Obstacle</a>s
 * @apiSuccess (Model) {Report} [department]
 * @apiSuccess (Model) {Object[]} [attachements]
 * @apiSuccess (Model) {String} .url
 */

/**
 * @api {get} /reports Get Reports
 * @apiVersion 0.0.1
 * @apiName Get
 * @apiGroup Report
 *
 * @apiuse JwtHeader
 *
 * @apiUse Response
 * @apiSuccess {Report[]} data Array of <a href="#api-Report-Model">Report</a>s
 *
 */

/**
 * @api {get} /reports/:id Get Report
 * @apiVersion 0.0.1
 * @apiName GetOne
 * @apiGroup Report
 *
 * @apiUse GetOne
 * @apiuse JwtHeader
 *
 * @apiParam (Query) {String} id MongoID
 *
 * @apiUse Response
 * @apiSuccess {Report} data of <a href="#api-report-Model">report</a> for the specified id
 *
 */

/**
 * @api {post} /reports Post Report
 * @apiVersion 0.0.1
 * @apiName Post
 * @apiGroup Report
 *
 * @apiuse JwtHeader
 *
 * @apiUse Response
 * @apiSuccess {Report} data <a href="#api-Report-Model">Report</a> that has been posted
 *
 */

/**
 * @api {delete} /reports/:id Delete Report
 * @apiVersion 0.0.1
 * @apiName Delete
 * @apiGroup Report
 *
 * @apiuse JwtHeader
 *
 * @apiParam (Query) {String} id MongoID
 *
 * @apiUse Response
 * @apiSuccess {Report} data <a href="#api-Report-Model">Report</a> that has been deleted
 *
 */

/**
 * @api {put} /reports/:id Put Report
 * @apiVersion 0.0.1
 * @apiName Put
 * @apiGroup Report
 * @apiUse Put
 *
 * @apiuse JwtHeader
 *
 * @apiParam (Query) {String} id MongoID
 *
 * @apiUse Response
 * @apiSuccess {Report} data <a href="#api-Report-Model">Report</a> that has been 'put'
 *
 */

/**
 * @api {patch} /reports/:id Patch Report
 * @apiVersion 0.0.1
 * @apiName Patch
 * @apiGroup Report
 * @apiUse Patch
 *
 * @apiuse JwtHeader
 *
 * @apiParam (Query) {String} id MongoID
 *
 * @apiUse Response
 * @apiSuccess {Report} data <a href="#api-Report-Model">Report</a> that has been patched
 *
 */
