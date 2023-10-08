/**
 * @typedef Error
 * @property {string} code
 * @property {string} [message]
 */

/**
 * @typedef Request
 * @property {string} method
 * @property {Record<string, any>} [params]
 */

/**
 * @type {Request}
 */
export const Request = {};


/**
 * @typedef Response
 * @property {any} [result]
 * @property {Error} [error]
 */

/**
 * @type {Response}
 */
export const Response = {};