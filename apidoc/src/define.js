/*
 * @Author: tim
 * @Date: 2020-06-12 11:00:02
 * @LastEditors: tim
 * @LastEditTime: 2020-06-12 13:57:34
 * @Description: 定义常用的数据结构
 */ 

 /**
 * @apiDefine Time
 * @apiSuccess {String} createTime 创建时间
 * @apiSuccess {String} updateTime 更新时间
 */

 /**
 * @apiDefine UserNotFoundError
 *
 * @apiError UserNotFound The id of the User was not found.
 *
 * @apiErrorExample Error-Response:
 *  HTTP/1.1 404 Not Found
 *  {
 *    "error": "UserNotFound"
 *  }
 */

/**
 * @apiDefine CreateUserError
 *
 * @apiError NoAccessRight Only authenticated Admins can access the data.
 * @apiError UserNameTooShort Minimum of 5 characters required.
 *
 * @apiErrorExample  Response (example):
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "UserNameTooShort"
 *     }
 */


/**
 * @apiDefine admin Admin access rights needed.
 * Optionally you can write here further Informations about the permission.
 *
 * An "apiDefine"-block can have an "apiVersion", so you can attach the block to a specific version.
 *
 */