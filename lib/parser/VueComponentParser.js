'use strict';

/*
 global module,
 require
 */
const path    = require( 'path' );
const vueDocs = require( 'vue-docgen-api' );

const LogUtility = require( '../utility/LogUtility' ),
      logger     = new LogUtility( { prefix: 'Vue Component' } );
const Collector  = require( './Collector' );

/**
 * Provides the ability to collect data from Vue single file components
 */
class VueComponentCollector extends Collector {

  /**
   * runs vue-docgen-api over all Vue files
   *
   * @param  {function} callback
   * @return {*}
   * @private
   */
  _invoke ( callback ) {
    const collection = {};

    for ( let file of this._files ) {
      let fileInfo = null;

      try {
        fileInfo = vueDocs.parse( file );
      }
      catch ( error ) {
        logger.logLine( `Error parsing file ${path.basename( file )}: ${error.message}` );
      }

      collection[ file ] = fileInfo;
    }

    return callback( collection );
  }
}

module.exports = VueComponentCollector;
