'use strict';

/*
 global module,
 require
 */

const Transformer = require( './Transformer' );

/**
 * Provides transformation into HTML. Accepts multiple options to account for templates
 *
 * @extends Transformer
 * @class
 * @memberOf Phoenix.Transformers
 */
class HtmlTransformer extends Transformer {
  constructor ( options ) {
    super( options );
  }

  _invoke ( document ) {
  }

  static get defaultOptions () {
    return {
      language:     'en',
      scripts:      [],
      styleSheets:  [],
      inlineStyles: []
    };
  }

  /**
   * @inheritDoc
   */
  heading ( text, level = 1 ) {
    return `<h${level}>${text}</h${level}>`;
  }

  /**
   * @inheritDoc
   */
  paragraph ( text ) {
    return `<p>${text}</p>`;
  }

  /**
   * @inheritDoc
   */
  emphasis ( text ) {
    return `<em>${text}</em>`;
  }

  /**
   * @inheritDoc
   */
  strongEmphasis ( text ) {
    return `<strong>${text}</strong>`;
  }

  /**
   * @inheritDoc
   */
  strikeThrough ( text ) {
    return `<del>${text}</del>`;
  }

  /**
   * @inheritDoc
   */
  code ( text ) {
    return `<code>${text}</code>`;
  }

  /**
   * @inheritDoc
   */
  codeBlock ( text, language = '' ) {
    return `<pre lang="${language}">${text}</pre>`;
  }

  /**
   * @inheritDoc
   */
  link ( target, text ) {
    return `<a href="${target}" rel="noopener">${text}</a>`;
  }

  /**
   * @inheritDoc
   */
  unOrderedList ( items ) {
    return items.reduce(
      ( list, currentItem ) => list + `<li>${currentItem}</li>`, '<ul>'
    ) + '</ul>';
  }

  /**
   * @inheritDoc
   */
  orderedList ( items ) {
    return items.reduce(
      ( list, currentItem ) => list + `<li>${currentItem}</li>`, '<ol>'
    ) + '</ol>';
  }

  /**
   * @inheritDoc
   */
  blockQuote ( text ) {
    return `<blockquote>${text}</blockquote>`;
  }

  /**
   * @inheritDoc
   */
  horizontalRule () {
    return '<hr>';
  }

  /**
   * @inheritDoc
   */
  image ( target, alt = 'Image', title = '' ) {
    return `<img src="${target}" alt="${alt}" title="${title}">`;
  }

  /**
   * @inheritDoc
   */
  table ( table, options = {} ) {
    // TODO
  }
}

module.exports = HtmlTransformer;
