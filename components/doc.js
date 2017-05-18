/**
 *  @apiDefine JwtHeader
 *
 * @apiHeader Authorization The JWT-token header: "JWT {{ TOKEN }}".
 * @apiError {String} 401/Unauthorized `Response.message` : Token is invalid or not provided
 */

/**
 * @apiDefine Response
 *
 * @apiSuccess {Boolean} success Indicates if request has been succesfully handled (`status === 200`)
 * @apiSuccess {Integer} status Response status
 * @apiSuccess {String} message `null` on success
 */

/**
 * @apiDefine Put
 *
 * @apiDescription Put is used to <b>replace</b> the selected document completely. This request <b>expects</b> you to give a whole document and is threatened that way. <br /> When the selected documented does not exist, it will create a new one.
 *
 * @apiError {String} 400/BadId `Response.message` : Please provide a valid 'id'
 * @apiError {String} 204/NoContent `Response.message` : Please provide values with your PUT request
 * @apiError {String} 400/BadParameter `Response.message` : Please provide a valid parameter to this PUT request
 *
 */

/**
 * @apiDefine Patch
 *
 * @apiDescription Patch is used to update certain parts of a document, it is thus not threatened as a whole document.
 *
 * @apiError {String} 400/BadId `Response.message` : Please provide a valid 'id'
 * @apiError {String} 204/NoContent `Response.message` : Please provide values with your PATCH request
 * @apiError {String} 400/BadParameter `Response.message` : Please provide a valid parameter to this PATCH request
 * @apiError {String} 404/NotFound `Response.message` : Could not find entity with `{req.params}`
 */

/**
 * @apiDefine GetOne
 *
 * @apiError {String} 400/BadId `Response.message` : Please provide a valid 'id'
 */
