/*
 * @Author: tim
 * @Date: 2020-06-12 10:31:26
 * @LastEditors: tim
 * @LastEditTime: 2020-06-12 13:53:23
 * @Description: 
 */ 

/**
 * @api {POST} /user/get getUserInfo
 * @apiVersion 0.2.0
 * @apiGroup User
 * @apiPermission admin
 * @apiDescription 描述这个API的信息
 *
 * @apiParam {String} userName 用户名
 * @apiParam {String} org 组织
 * @apiParamExample {json} request-example
 * {
 *  "userName": "Eve",
 *  "org": "SSH"
 * }
 *
 * @apiError {String} message 错误信息
 * @apiErrorExample  {json} error-example
 * {
 *   "message": "用户名不存在"
 * }
 * 
 * 
 * @apiSuccess {String} userName 用户名
 * @apiUse Time
 * @apiSuccessExample  {json} success-example
 * {
 *   "userName": "Eve",
 *   "createTime": "1568901681"
 *   "updateTime": "1568901681"
 * }
 */
function getUserInfo(username) {
  // 假如这个函数是根据用户名返回用户信息的
}


/**
 * @api {get} /user/:id getUser
 * @apiVersion 0.2.0
 * @apiName GetUser
 * @apiGroup User
 * @apiDescription Request User information
 *
 * @apiParam {Number} id Users unique ID.
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "firstname": "John",
 *       "lastname": "Doe"
 *     }
 * @apiUse UserNotFoundError
 */

/**
 * @api {put} /user/ putUser
 * @apiVersion 0.2.0
 * @apiGroup User
 * @apiName PutUser
 * @apiDescription Request User information
 *
 * @apiParam {Number} id          Users unique ID.
 * @apiParam {String} [firstname] Firstname of the User.
 * @apiParam {String} [lastname]  Lastname of the User.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 * 
 * @apiUse CreateUserError
 * @apiUse UserNotFoundError
 */