'use strict';

/*
 global module,
 require
 */

/**
 * Holds all transformers
 *
 * @namespace Phoenix.Transformers
 */

const AbstractModule = require( '../AbstractModule' );

/**
 * A transformer is a class that takes information about a file as input and transforms
 * it into a certain output format. This might be HTML, JSON, XML, a JavaScript object or even plain
 * text.
 *
 * @abstract
 * @extends AbstractModule
 * @class
 * @memberOf Phoenix.Transformers
 */
class Transformer extends AbstractModule {
  constructor ( AST, document, options ) {
    super( options );

    this.document = document;
  }

  /**
   * transforms code into documentation output
   *
   * @param  {Document} document
   * @return {Promise.<String>}
   */
  transform ( document ) {
    return this._invoke( document );
  }

  /**
   * @description invokes the transformer
   *
   * @param  {Document} document
   * @return {Promise.<String>}
   * @private
   * @stub
   */
  _invoke ( document ) {

  }

  /**
   * writes a heading element.
   *
   * @param  {string} text  heading content
   * @param  {number} level heading level 1-6
   * @return {string}
   */
  heading ( text, level = 1 ) {
  }

  /**
   * writes a paragraph of plain text. Further nested formatting is available.
   *
   * @param {string} text paragraph content
   * @return {string}
   */
  paragraph ( text ) {
  }

  /**
   * writes one or more words with emphasis.
   *
   * @param  {string} text text to emphasize
   * @return {string}
   */
  emphasis ( text ) {
  }

  /**
   * writes one or more words with strong emphasis.
   *
   * @param  {string} text text to emphasize strongly
   * @return {string}
   */
  strongEmphasis ( text ) {
  }

  /**
   * writes one or more words striked through.
   *
   * @param  {string} text text to strike through
   * @return {string}
   */
  strikeThrough ( text ) {
  }

  /**
   * writes an inline code block.
   *
   * @param  {string} text code text
   * @return {string}
   */
  code ( text ) {
  }

  /**
   * writes a code block. if a language is passed, it will be referenced by the implementation so
   * that syntax highlighting can be enabled.
   *
   * @param  {string} text       code text
   * @param  {string} [language] programming language this block should be highlighted as
   * @return {string}
   */
  codeBlock ( text, language = '' ) {
  }

  /**
   * writes a link. if no label is passed, the link target will be used.
   *
   * @param  {string} target link target
   * @param  {string} [text] link label
   * @return {string}
   */
  link ( target, text = '' ) {
  }

  /**
   * writes an unordered list.
   *
   * @param  {Array.<string>} items list items
   * @return {string}
   */
  unOrderedList ( items ) {
  }

  /**
   * writes an ordered list (using the item index as numbering).
   *
   * @param  {Array.<string>} items list items
   * @return {string}
   */
  orderedList ( items ) {
  }

  /**
   * writes a block quote.
   *
   * @param  {string} text
   * @return {string}
   */
  blockQuote ( text ) {
  }

  /**
   * writes a horizontal rule.
   *
   * @return {string}
   */
  horizontalRule () {
  }

  /**
   * writes a reference to an image.
   *
   * @param  {string} target  image source
   * @param  {string} [alt]   image alt text
   * @param  {string} [title] image hover title
   * @return {string}
   */
  image ( target, alt = 'Image', title = '' ) {
  }

  /**
   * renders a table
   *
   * @param  {Array.<Array>}  table           The table Array, holding separate Arrays for all rows,
   *                                          including the table headers
   * @param  {object}         [options]       Optional object holding several rendering options
   * @param  {Array.<string>} [options.align] An Array holding optional alignment instructions. The
   *                                          available values are `left`, `right`, `center` or `.`.
   *                                          They need to be given in the correct order (conforming
   *                                          with the table order itself)
   * @param  {boolean}        [options.rule]  whether to use a horizontal rule for the table
   * @param  {boolean}        [options.pad]   whether to pad all strings for a nicer visual display
   * @return {string}                         rendered table
   *
   * @example t.table([
   *   [ 'property', 'required', 'default', 'description' ],
   *   [ 'foo',      false,      'bar',     'Shows bar where there\'s foo' ],
   *   [ 'baz',      true,       'quz',     'Practically useless' ]
   * ], { align: [ 'left', 'center', '.', 'right' ] });
   */
  table ( table, options = {} ) {
  }

  /**
   * Provides a list of common object types. This serves as an agreement on available output types:
   * Every writer knows what an output object resembles. For example, a container might map to a
   * directory on the file system or a table in a database.
   * Object types directly map to output node class names.
   *
   * @return {{container: string, containerEmpty: string, object: string, index: string}}
   */
  static get types () {
    return {
      container:      'DocumentationContainer',
      containerEmpty: 'DocumentationEmptyContainer',
      object:         'DocumentationObject',
      index:          'DocumentationIndex'
    };
  }
}

module.exports = Transformer;
