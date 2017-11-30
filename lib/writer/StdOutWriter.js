'use strict';

/*
 global module,
 require
 */

const Writer = require( './Writer' );

/**
 * Writes documentation to STDOUT
 *
 * @extends Writer
 * @class
 * @memberOf Phoenix.Writers
 */
class StdOutWriter extends Writer {
}

module.exports = StdOutWriter;
