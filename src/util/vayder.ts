'use strict';
const {celebrate} = require('celebrate');


export class Vayder {

    /** Will validate the request object with the specified schemas
     * @param {Object} schemaMap - map of req inputs => JOI schema to validate
     * valid keys for schemaMap:  headers, body, query, params
     * @param {Object} options - Joi options to be directly passed into validation
     * @returns {Function} a middleware function to execute
     */
    static validateInputs(schemaMap, options) {
        const opts = Object.assign({}, options);
        return celebrate(schemaMap, opts);
    }

    // noinspection JSUnusedGlobalSymbols
    /** Facade wrapper for validateInputs
     * @param {Object} schemaObj - JOI schema to validate input against
     * @param {Object} options - [optional] options to pass to Joi directly
     */

    static validateHeaders(schemaObj, options) {
        return Vayder.validateInputs({ headers: schemaObj }, options);
    }

    /** Facade wrapper for validateInputs
     * @param {Object} schemaObj - JOI schema to validate input against
     * @param {Object} options - [optional] options to pass to Joi directly
     */
    static validateBody(schemaObj, options) {
        return Vayder.validateInputs({ body: schemaObj }, options);
    }

    // noinspection JSUnusedGlobalSymbols
    /** Facade wrapper for validateInputs
     * @param {Object} schemaObj - JOI schema to validate input against
     * @param {Object} options - [optional] options to pass to Joi directly
     */
    static validateParams(schemaObj, options) {
        return Vayder.validateInputs({ params: schemaObj }, options);
    }

    // noinspection JSUnusedGlobalSymbols
    /** Facade wrapper for validateInputs
     * @param {Object} schemaObj - JOI schema to validate input against
     * @param {Object} options - [optional] options to pass to Joi directly
     */
    static validateQuery(schemaObj, options) {
        return Vayder.validateInputs({ query: schemaObj }, options);
    }
}

/*
MIT License

Copyright (c) 2017 Naveed

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
 */
