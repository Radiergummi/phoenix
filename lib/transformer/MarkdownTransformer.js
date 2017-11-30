'use strict';

/*
 global module,
 require
 */

const Transformer = require( './Transformer' );

/**
 * Provides transformation to Markdown
 *
 * @extends Transformer
 * @class
 * @memberOf Phoenix.Transformers
 */
class MarkdownTransformer extends Transformer {

  /**
   * write Markdown output
   * @param {Document} document
   * @private
   */
  _invoke ( document ) {

  }

  /**
   * @inheritDoc
   */
  heading ( text, level = 1 ) {
    return `${'#'.repeat( level )} ${text}\n`;
  }

  /**
   * @inheritDoc
   */
  paragraph ( text ) {
    return `\n${text}\n`;
  }

  /**
   * @inheritDoc
   */
  emphasis ( text ) {
    return `*${text}*`;
  }

  /**
   * @inheritDoc
   */
  strongEmphasis ( text ) {
    return `**${text}**`;
  }

  /**
   * @inheritDoc
   */
  strikeThrough ( text ) {
    return `~~${text}~~`;
  }

  /**
   * @inheritDoc
   */
  code ( text ) {
    return '`' + text + '`';
  }

  /**
   * @inheritDoc
   */
  codeBlock ( text, language = '' ) {
    return '\n```' + language + '\n' + text + '\n```\n';
  }

  /**
   * @inheritDoc
   */
  link ( target, text ) {
    return `[${text}](${target})`;
  }

  /**
   * @inheritDoc
   */
  unOrderedList ( items ) {
    return items.reduce( ( list, currentItem ) => {
      return list + ` - ${currentItem}\n`;
    }, '' );
  }

  /**
   * @inheritDoc
   */
  orderedList ( items ) {
    return items.reduce( ( list, currentItem, currentIndex ) => {
      return list + ` ${currentIndex}. ${currentItem}`;
    }, '' );
  }

  /**
   * @inheritDoc
   */
  blockQuote ( text ) {
    return `> ${text}\n`;
  }

  /**
   * @inheritDoc
   */
  horizontalRule () {
    return '\n\n------\n\n';
  }

  /**
   * @inheritDoc
   */
  image ( target, alt = 'Image', title = '' ) {
    return `![${alt}](${target} "${title}")`;
  }

  /**
   * @augments Transformer#table
   *
   * I've taken this Markdown method from @wooorm from Github and modified the source a bit.
   * @see https://github.com/wooorm/markdown-table
   */
  table ( table, options = {} ) {
    const delimiter = ' | ',
          start     = '| ',
          end       = ' |';

    let alignment = options.align,
        cellCount = 0,
        rowIndex  = -1,
        rowLength = table.length,
        sizes     = [],
        align,
        rule,
        rows,
        row,
        cells,
        index,
        position,
        size,
        value,
        spacing,
        before,
        after;

    alignment = alignment ? alignment.concat() : [];

    /**
     * @description get the position of the last dot in `value`
     * @param  {*}      value
     * @return {number}
     */
    function dotIndex ( value ) {
      const match = /\.[^.]*$/.exec( value );

      return match ? match.index + 1 : value.length;
    }

    while ( rowIndex++ < rowLength ) {
      row = table[ rowIndex ];

      index = -1;

      if ( row.length > cellCount ) {
        cellCount = row.length;
      }

      while ( index++ < cellCount ) {
        position = row[ index ] ? dotIndex( row[ index ] ) : null;

        if ( !sizes[ index ] ) {
          sizes[ index ] = 3;
        }

        if ( position > sizes[ index ] ) {
          sizes[ index ] = position;
        }
      }
    }

    if ( typeof alignment === 'string' ) {
      alignment = alignment.repeat( cellCount ).split( '' );
    }

    // Make sure only valid alignments are used
    index = -1;

    while ( index++ < cellCount ) {
      align = alignment[ index ];

      if ( typeof align === 'string' ) {
        align = align.charAt( 0 ).toLowerCase();
      }

      if ( [ 'left', 'right', 'center', '.', '' ].indexOf( align ) === -1 ) {
        align = '';
      }

      alignment[ index ] = align;
    }

    rowIndex = -1;
    rows     = [];

    while ( rowIndex++ < rowLength ) {
      row = table[ rowIndex ];

      index = -1;
      cells = [];

      while ( ++index < cellCount ) {
        value = row[ index ];

        value = String( value ) || '';

        if ( alignment[ index ] === '.' ) {
          position = dotIndex( value );

          size = sizes[ index ] +
            (/\./.test( value ) ? 0 : 1) -
            (String( value ).length - position);

          cells[ index ] = value + ' '.repeat( size - 1 );
        } else {
          cells[ index ] = value;
        }
      }

      rows[ rowIndex ] = cells;
    }

    sizes    = [];
    rowIndex = -1;

    while ( rowIndex++ < rowLength ) {
      cells = rows[ rowIndex ];

      index = -1;

      while ( index++ < cellCount ) {
        value = cells[ index ];

        if ( !sizes[ index ] ) {

          // minimum cell size
          sizes[ index ] = 3;
        }

        size = String( value ).length;

        if ( size > sizes[ index ] ) {
          sizes[ index ] = size;
        }
      }
    }

    rowIndex = -1;

    while ( rowIndex++ < rowLength ) {
      cells = rows[ rowIndex ];

      index = -1;

      if ( options.pad !== false ) {
        while ( index++ < cellCount ) {
          value = cells[ index ];

          position = sizes[ index ] - (String( value ).length || 0);
          spacing  = ' '.repeat( position );

          if ( alignment[ index ] === 'right' || alignment[ index ] === '.' ) {
            // noinspection JSUnresolvedFunction
            value = spacing.padStart( position );
          } else if ( alignment[ index ] === 'center' ) {
            position /= 2;

            if ( position % 1 === 0 ) {
              before = position;
              after  = position;
            } else {
              before = position + 0.5;
              after  = position - 0.5;
            }

            // noinspection JSUnresolvedFunction
            value = value
              .padStart( before )
              .padEnd( after );
          } else {
            value += spacing;
          }

          cells[ index ] = value;
        }
      }

      rows[ rowIndex ] = cells.join( delimiter );
    }

    if ( options.rule !== false ) {
      index = -1;
      rule  = [];

      while ( ++index < cellCount ) {

        // When `pad` is false, make the rule the same size as the first row
        if ( options.pad === false ) {
          value   = table[ 0 ][ index ];
          spacing = String( value ).length;
          spacing = spacing > 3 ? spacing : 3;
        } else {
          spacing = sizes[ index ];
        }

        align = alignment[ index ];

        // When `align` is left, don't add colons.
        value = align === 'right' || align === '' ? '-' : ':';
        value += '-'.repeat( spacing - 2 );
        value += align !== 'left' && align !== '' ? ':' : '-';

        rule[ index ] = value;
      }

      rows.splice( 1, 0, rule.join( delimiter ) );
    }

    return start + rows.join( end + '\n' + start ) + end;
  }
}

module.exports = MarkdownTransformer;
