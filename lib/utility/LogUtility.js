'use strict';

/*
 global module,
 require
 */

const Utility = require( './Utility' );

/**
 * Provides a dynamic logger
 *
 * @extends Utility
 * @class
*/
class LogUtility extends Utility {

  /**
   * creates a new logger instance. This is called indirectly from the static logger methods, but
   * you can also use it to create a logger local to the current file, for example to provide a
   * prefix for all lines logged from there.
   *
   * @param {object}                               [options] logger options, see _defaultOptions.
   * @param {process.stdout|process.stderr|Stream} [stream]  output stream. this has to be a stream
   *                                                         interface on par with the process
   *                                                         streams.
   *
   * @constructor
   */
  constructor ( options, stream = process.stdout ) {
    super( options );

    this._stream = stream;
  }

  set prefix ( newPrefix ) {
    this._options.prefix = newPrefix;
  }

  /**
   * retrieves the default logger options
   *
   * @return {{prefix: string, time: string}}
   * @private
   */
  static get _defaultOptions () {
    return {

      /**
       * log prefix. this might be something like the current module name.
       *
       * @type {string}
       */
      prefix: '',

      /**
       * getter for the log timestamp. This needs to return some kind of string, the library doesn't
       * care what it is (so you could abuse it for whatever you'd like).
       *
       * @return {string}
       */
      get time () {
        return new Date().toLocaleTimeString();
      },

      /**
       * log line formatter callback. expected to return the actual log line.
       *
       * @param  {{time: string, prefix: string, line: string}} data data to build the line from
       * @return {string}                                            actual log line
       */
      formatLine ( data ) {
        return `${data.time}: ${data.prefix ? '[' + data.prefix + '] ' : ''}${data.line}`;
      }
    };
  }

  /**
   * retrieves the current Utility instance or creates a new one, if none available
   *
   * @return {LogUtility}
   * @private
   */
  static get _instance () {
    if ( !LogUtility.__instance ) {
      LogUtility.__instance = LogUtility.create();
    }

    return LogUtility.__instance;
  }

  /**
   * logs a line
   *
   * @param  {*}    args input arguments to log
   * @return {void}
   */
  logLine ( ...args ) {
    const line = this._options.formatLine( {
      time:   this._options.time,
      prefix: this._options.prefix,
      line:   args.join( ' ' )
    } );

    this._stream.write( line.padEnd( this._stream.columns ) + '\n' );
  }

  /**
   * updates the current output line
   *
   * @param  {*}    args
   * @return {void}
   */
  updateLine ( ...args ) {
    const line = this._options.formatLine( {
      time:   this._options.time,
      prefix: this._options.prefix,
      line:   args.join( ' ' )
    } );

    this._stream.cursorTo( 0 );
    this._stream.write( line.padEnd( this._stream.columns ) );
  }

  /**
   * forwards the log call to the instance method
   *
   * @param  {*}    args input arguments to log
   * @return {void}
   */
  static logLine ( ...args ) {
    return LogUtility._instance.logLine( ...args );
  }

  /**
   * forwards the log call to the instance method
   *
   * @param  {*}    args args input arguments to log
   * @return {void}
   */
  static updateLine ( ...args ) {
    return LogUtility._instance.logLine( ...args );
  }
}

module.exports = LogUtility;
