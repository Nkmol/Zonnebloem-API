/**
 * @api {post} /login Login
 * @apiName Login
 * @apiGroup Authorization
 * @apiVersion 0.0.1
 *
 * @apiParam {String} username username login
 * @apiParam {String} password password login
 *
 * @apiError {JSON} 400/BadRequest `Response.message` : Please provide 'username' and 'password'
 * @apiError {JSON} 401/Unauthorized `Response.message` : The given combination of password and username did not exist.
 *
 * @apiUse Response
 * @apiSuccess {User} data <a href="#api-User-Model">User</a> that has been logged in
 * @apiSuccess {String} token The JWT-token for your user
 */

/**
 * @api {post} /register Register
 * @apiName Register
 * @apiGroup Authorization
 * @apiVersion 0.0.1
 *
 * @apiHeader Content-Type application/json
 *
 * @apiParam {String} username username login
 * @apiParam {String} password password login
 * @apiParam {String} email emailadress for you account
 *
 * @apiError {JSON} 400/BadRequest `Response.message` : Please provide 'username', 'password' and 'email'
 * @apiError {JSON} 409/ConflictMail `Response.message` : An account has already been registrated to this mailadress.
 * @apiError {JSON} 409/ConflictUsername `Response.message` : This username is already in use.
 *
 * @apiUse Response
 * @apiSuccess {User} data <a href="#api-User-Model">User</a> that has been logged in
 * @apiSuccess {String} token The JWT-token for your user
 */
