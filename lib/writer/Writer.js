'use strict';

/*
 global module,
 require
 */

const AbstractModule = require( '../AbstractModule' );
const LogUtility     = require( '../utility/LogUtility' );

/**
 * @name Abstract
 * @abstract
 */
class Writer extends AbstractModule {
  constructor ( objects, options ) {
    super( options );

    if ( new.target === Abstract ) {
      throw new TypeError( 'Cannot construct Writer instances directly' );
    }

    this._objects = objects;
    this._logger  = new LogUtility( { prefix: this.constructor.name } );
  }

  get logger () {
    return this._logger;
  }

  /**
   * writes all objects to a file
   *
   * @param callback
   * @return {*}
   */
  write ( callback = Writer.noOp ) {
    return this._invoke( callback );
  }
}

module.exports = Writer;
