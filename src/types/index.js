/**
 * @typedef Error
 * @property {string} code
 * @property {string} [message]
 */

/**
 * @typedef Request
 * @property {string|number} [id]
 * @property {string} method
 * @property {Record<string, any>} [params]
 */

/**
 * @type {Request}
 */
export const Request = null;


/**
 * @typedef Response
 * @property {string|number} [id]
 * @property {any} [result]
 * @property {Error} [error]
 */

/**
 * @type {Response}
 */
export const Response = null;