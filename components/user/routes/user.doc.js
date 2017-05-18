/**
 * @api {none} / Model Structure
 * @apiVersion 0.0.1
 * @apiName Model
 * @apiGroup User
 *
 * @apiDeprecated This is only used to define the model.
 *
 * @apiSuccess (Model Autogenerated) {String} _id MongoID this is autogenerated depending on the HTTP method
 * @apiSuccess (Model Autogenerated) {String} updated_at Indicated when the document has been updated
 * @apiSuccess (Model Autogenerated) {String} created_at Indicated when the document has been created
 * @apiSuccess (Model) {String} username
 * @apiSuccess (Model) {String} email
 * @apiSuccess (Model) {String} [firstname]
 * @apiSuccess (Model) {String} [lastname]
 * @apiSuccess (Model) {String} [tel]
 * @apiSuccess (Model) {Object} [address]
 * @apiSuccess (Model) {String}     .street
 * @apiSuccess (Model) {String}     .house_number
 * @apiSuccess (Model) {String}     .city
 * @apiSuccess (Model) {String}     .zip_code
 * @apiSuccess (Model) {Object[]} [roles] A user can have multiple roles in multiple departments
 * @apiSuccess (Model) {String}     .role enum `[ "ADMIN", "MODERATOR", "CONTROLER", "VOLUNTEER" ]`
 * @apiSuccess (Model) {Department} .department
 * @apiSuccess (Model) {String} [profile_image]
 * @apiSuccess (Model) {Boolean} [is_active]
 */

/**
 * @api {none} / Model Structure
 * @apiVersion 0.0.2
 * @apiName Model
 * @apiGroup User
 *
 * @apiDeprecated This is only used to define the model.
 *
 * @apiSuccess (Model Autogenerated) {String} _id MongoID this is autogenerated depending on the HTTP method
 * @apiSuccess (Model Autogenerated) {String} updated_at Indicated when the document has been updated
 * @apiSuccess (Model Autogenerated) {String} created_at Indicated when the document has been created
 * @apiSuccess (Model) {String} username
 * @apiSuccess (Model) {String} email
 * @apiSuccess (Model) {String} [firstname]
 * @apiSuccess (Model) {String} [lastname]
 * @apiSuccess (Model) {String} [tel]
 * @apiSuccess (Model) {Object} [address]
 * @apiSuccess (Model) {String}     .street
 * @apiSuccess (Model) {String}     .house_number
 * @apiSuccess (Model) {String}     .city
 * @apiSuccess (Model) {String}     .zip_code
 * @apiSuccess (Model) {Object[]} [roles] A user can have multiple roles in multiple departments. <br /><b>Default: </b> one Role `{"role": "GUEST", "department": null}`
 * @apiSuccess (Model) {String}     .role enum `[ "ADMIN", "MODERATOR", "CONTROLER", "VOLUNTEER", "GUEST"]`
 * @apiSuccess (Model) {Department} [.department]
 * @apiSuccess (Model) {String} [profile_image]
 * @apiSuccess (Model) {Boolean} [is_active]
 */

/**
 * @api {get} /users Get Users
 * @apiVersion 0.0.1
 * @apiName Get
 * @apiGroup User
 *
 * @apiuse JwtHeader
 *
 * @apiUse Response
 * @apiSuccess {User[]} data Array of <a href="#api-User-Model">User</a>s
 *
 */

/**
 * @api {get} /users/:id Get User
 * @apiVersion 0.0.1
 * @apiName GetOne
 * @apiGroup User
 *
 * @apiuse JwtHeader
 * 
 * @apiParam (Query) {String} id MongoID
 *
 * @apiUse Response
 * @apiSuccess {User} data of <a href="#api-User-Model">User</a> for the specified id
 *
 */

/**
 * @api {post} /users Post User
 * @apiVersion 0.0.1
 * @apiName Post
 * @apiGroup User
 *
 * @apiuse JwtHeader
 *
 * @apiUse Response
 * @apiSuccess {User} data <a href="#api-User-Model">User</a> that has been posted
 *
 */

/**
 * @api {delete} /users/:id Delete User
 * @apiVersion 0.0.1
 * @apiName Delete
 * @apiGroup User
 *
 * @apiuse JwtHeader
 *
 * @apiParam (Query) {String} id MongoID
 *
 * @apiUse Response
 * @apiSuccess {User} data <a href="#api-User-Model">User</a> that has been deleted
 *
 */

/**
 * @api {put} /users/:id Put User
 * @apiVersion 0.0.1
 * @apiName Put
 * @apiGroup User
 * @apiUse Put
 *
 * @apiuse JwtHeader
 *
 * @apiParam (Query) {String} id MongoID
 *
 * @apiUse Response
 * @apiSuccess {User} data <a href="#api-User-Model">User</a> that has been 'put'
 *
 */

/**
 * @api {patch} /users/:id Patch User
 * @apiVersion 0.0.1
 * @apiName Patch
 * @apiGroup User
 * @apiUse Patch
 *
 * @apiuse JwtHeader
 *
 * @apiParam (Query) {String} id MongoID
 *
 * @apiUse Response
 * @apiSuccess {User} data <a href="#api-User-Model">User</a> that has been patched
 *
 */

/**
 * @api {get} /users/:id Get User
 * @apiVersion 0.0.1
 * @apiName Getone
 * @apiGroup User
 *
 * @apiUse GetOne
 * @apiUse JwtHeader
 *
 * @apiParam (Query) {String} id MongoID
 *
 * @apiUse Response
 * @apiSuccess {User} data <a href="#api-User-Model">User</a> that has been patched
 *
 */

/**
 * @api {get} /users/me Get Me
 * @apiVersion 0.0.1
 * @apiName me
 * @apiGroup User
 *
 * @apiUse JwtHeader
 *
 * @apiUse Response
 * @apiSuccess {User} data <a href="#api-User-Model">User</a> that is defined by the given JWT-token
 *
 */
