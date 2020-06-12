/*
 * @Author: tim
 * @Date: 2020-06-12 13:37:09
 * @LastEditors: tim
 * @LastEditTime: 2020-06-12 14:08:54
 * @Description: 历史记录
 */ 

// ------------------------------------------------------------------------------------------
// General apiDoc documentation blocks and old history blocks.
// ------------------------------------------------------------------------------------------

/**
 * @apiDefine TimeTest
 * @apiVersion 0.1.0
 * @apiSuccess {String} createTime 创建时间
 * @apiSuccess {String} updateTime 更新时间
 */

// ------------------------------------------------------------------------------------------
// History.
// ------------------------------------------------------------------------------------------
/**
 * @apiDefine admin This title is visible in version 0.1.0 and 0.2.0
 * @apiVersion 0.1.0
 */

/**
 * @api {get} /user/:id Read data of a User
 * @apiVersion 0.1.0
 * @apiName GetUser
 * @apiGroup User
 * @apiPermission admin
 *
 * @apiDescription Here you can describe the function.
 * Multilines are possible.
 *
 * @apiParam {String} id The Users-ID.
 *
 * @apiSuccess {String} id         The Users-ID.
 * @apiSuccess {Date}   name       Fullname of the User.
 *
 * @apiError UserNotFound   The error description text in version 0.1.0.
 */

/**
 * @api {post} /user PostUser
 * @apiVersion 0.1.0
 * @apiName PostUser
 * @apiGroup User
 * @apiPermission none
 *
 * @apiDescription In this case "apiUse" is defined and used.
 * Define blocks with params that will be used in several functions, so you dont have to rewrite them.
 *
 * @apiParam {String} name Name of the User.
 *
 * @apiSuccess {String} id         The Users-ID.
 *
 * @apiUse CreateUserError
 */