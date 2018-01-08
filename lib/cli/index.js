'use strict';

/*
 global module,
 require
 */

const app         = require( 'commander' ),
      path        = require( 'path' );
const packageJson = require( '../../package.json' );

module.exports = function () {
  let commandCalled = false;

  app
    .version( packageJson.version )
    .option( '-c, --config [path]', 'path to the configuration file', _ => _, process.cwd() + '/.phoenixrc' )
    .option( '-v, --verbose', 'shows verbose output' )
    .action( _ => commandCalled = true );

  app.parse( process.argv );

  // noinspection JSUnresolvedVariable
  const config = loadPhoenixConfiguration( app.config );

  startPhoenix( config );
};

/**
 * loads the Phoenix configuration from file
 *
 * @param  {string} configFilePath
 * @return {*}
 */
function loadPhoenixConfiguration ( configFilePath ) {
  let config;

  try {
    config = require( path.resolve( configFilePath ) );
  }
  catch ( error ) {
    console.error( `Could not load configuration from '${configFilePath}': ${error.message}` );

    // show the full error in verbose mode, unless it is a ENOENT error which has a useless stack
    // noinspection JSUnresolvedVariable
    if ( app.verbose && error.code !== 'MODULE_NOT_FOUND' ) {
      console.error( error );
    }

    process.exit( 1 );
  }

  return config;
}

/**
 * starts Phoenix
 *
 * @param {object} config
 */
function startPhoenix ( config ) {
  const Phoenix = require( '../Phoenix' );

  let phoenix = new Phoenix( config );
  phoenix
    .on( 'read:error', d => console.error( 'error while reading', app.verbose ? d.error : d.error.message ) )
    .on( 'parse:error', d => console.error( 'error while parsing', app.verbose ? d.error : d.error.message) );

  if ( app.verbose ) {
    phoenix
      .on( 'read:before', d => console.log( 'read before: ' + d.reader.constructor.name ) )
      .on( 'read:after', d => console.log( 'read after: ' + d.reader.constructor.name ) )
      .on( 'parse:before', d => console.log( 'parse before: ' + d.parser.constructor.name ) )
      .on( 'parse:after', d => console.log( 'parse after: ' + d.parser.constructor.name ) );
  }

  phoenix
    .run()
    .catch( error => {
      // noinspection JSUnresolvedVariable
      console.error( app.verbose ? error : error.message );
      process.exit( error.code || 1 );
    } );
}
