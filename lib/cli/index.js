'use strict';

/*
 global module,
 require
 */

/**
 * @property {boolean} verbose
 * @property {string} config
 * @type {Command}
 */
const app         = require( 'commander' );
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
 * @param  {string} path
 * @return {*}
 */
function loadPhoenixConfiguration ( path ) {
  let config;

  try {
    config = require( path );
  }
  catch ( error ) {
    console.error( `Could not load configuration from ${path}: ${error.message}` );

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

  if ( app.verbose ) {
    phoenix
      .on( 'read:error', d => console.error( 'error while reading', d.error ) )
      .on( 'read:before', d => console.error( 'read before: ' + d.reader.constructor.name ) )
      .on( 'read:after', d => console.error( 'read after: ' + d.reader.constructor.name ) )
      .on( 'parse:error', d => console.error( 'error while parsing', d.error ) )
      .on( 'parse:before', d => console.error( 'parse before: ' + d.parser.constructor.name ) )
      .on( 'parse:after', d => console.error( 'parse after: ' + d.parser.constructor.name ) );
  }

  phoenix
    .run()
    .catch( error => {
      // noinspection JSUnresolvedVariable
      console.error( app.verbose ? error : error.message );
      process.exit( error.code || 1 );
    } );
}
