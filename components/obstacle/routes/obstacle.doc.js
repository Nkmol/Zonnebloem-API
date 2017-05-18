/**
 * @apiDefine ObstacleModel
 *
 * @apiSuccess (Model Autogenerated) {String} _id MongoID this is autogenerated depending on the HTTP method
 * @apiSuccess (Model Autogenerated) {String} updated_at Indicated when the document has been updated
 * @apiSuccess (Model Autogenerated) {String} created_at Indicated when the document has been created
 * @apiSuccess (Model) {String} title
 * @apiSuccess (Model) {String} description
 * @apiSuccess (Model) {GeoJSON} [geometry]
 * @apiSuccess (Model) {String} .type default "Point"
 * @apiSuccess (Model) {Double[]} .coordinates containing long and lang double
 * @apiSuccess (Model) {User} created_by
 * @apiSuccess (Model) {String[]} [images]
 * @apiSuccess (Model) {String} state enum `[ NEW, REPORTED, DECLINED, IN_PORGRESS, SOLVED ]`
 * @apiSuccess (Model) {String} factor enum `[ HIGH, MEDIUM, LOW ]`
 *
 */

/**
 * @api {none} / Model Structure
 * @apiVersion 0.0.1
 * @apiName Model
 * @apiGroup Obstacle
 *
 * @apiDeprecated This is only used to define the model.
 * @apiUse ObstacleModel
 */

/**
 * @api {get} /obstacles Get Obstacles
 * @apiVersion 0.0.1
 * @apiName Get
 * @apiGroup Obstacle
 *
 * @apiuse JwtHeader
 *
 * @apiUse Response
 * @apiSuccess {Obstacle[]} data Array of <a href="#api-Obstacle-Model">Obstacle</a>s
 *
 */

/**
 * @api {post} /obstacles Post Obstacle
 * @apiVersion 0.0.1
 * @apiName Post
 * @apiGroup Obstacle
 *
 * @apiuse JwtHeader
 *
 * @apiUse Response
 * @apiSuccess {Obstacle} data <a href="#api-Obstacle-Model">Obstacle</a> that has been posted
 *
 */

/**
 * @api {delete} /obstacles/:id Delete Obstacle
 * @apiVersion 0.0.1
 * @apiName Delete
 * @apiGroup Obstacle
 *
 * @apiuse JwtHeader
 *
 * @apiParam (Query) {String} id MongoID
 *
 * @apiUse Response
 * @apiSuccess {Obstacle} data <a href="#api-Obstacle-Model">Obstacle</a> that has been deleted
 *
 */

/**
 * @api {put} /obstacles/:id Put Obstacle
 * @apiVersion 0.0.1
 * @apiName Put
 * @apiGroup Obstacle
 * @apiUse Put
 *
 * @apiuse JwtHeader
 *
 * @apiParam (Query) {String} id MongoID
 *
 * @apiUse Response
 * @apiSuccess {Obstacle} data <a href="#api-Obstacle-Model">Obstacle</a> that has been 'put'
 *
 */

/**
 * @api {patch} /obstacles/:id Patch Obstacle
 * @apiVersion 0.0.1
 * @apiName Patch
 * @apiGroup Obstacle
 * @apiUse Patch
 *
 * @apiuse JwtHeader
 *
 * @apiParam (Query) {String} id MongoID
 *
 * @apiUse Response
 * @apiSuccess {Obstacle} data <a href="#api-Obstacle-Model">Obstacle</a> that has been patched
 *
 */

