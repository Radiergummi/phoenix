Document API
============
The document API provides an abstract interface to defining the individual components of a document,
without touching the actual implementation. Therefore, it can be plugged into any output system as 
long as it knows how to handle a Document instance.


The `Node` class
----------------
A node is a node within a tree structure. Each node can hold children nodes that in return hold 
their own children nodes. In fact, the `Document` class inherits from `Node` by itself. It carries 
some basic methods that you may know from browsers: `appendChild`, `removeChild`, `previousSibling`
and so on. You can find them [below](#node-api).


Elements
--------
Elements are abstract document instances that inherit from `Node`. An element is more sophisticated,
featuring a lot of behaviour from the browser DOM. Elements represent a certain part of a document,
without going into the specifics on how to actually render them. There are tables, images, links,
paragraphs and separators, even comments. You can think of them as basic building blocks.    
There are two special features of elements that make them exceptionally useful:  **Attributes** and 
**textContent**. 

### Element attributes
All elements can hold an arbitrary number of attributes, kind of
meta data for an element. That can be things like a link target, a reference to something or even
a simple "class" system to group unrelated content together. These attributes are stored within the
`attributes` property and also directly accessible through the element instance. Consider the 
following example:

```js
// creating elements
const section = new Section(new Paragraph('Foo bar'));

// setting an attribute
section.setAttribute('foo', 'bar');

console.log(
  section.getAttribute('foo'),
	section.foo
); // "bar" "bar"
```


#### Guarded element properties
You might wonder what happens if you define an attribute with the name of an existing element method
or property - for example "appendChild", or "constructor". To prevent accidentally overwriting these
reserved properties, they are dynamically guarded (a little reflection magic).  
Attributes can hold an arbitrary type of data, though it is recommended to use separate attributes
for separate concerns.


### Text elements and the `textContent` property
Aside from the usual elements, there is also an element named `Text`. It holds a string of plain 
text and no further children elements and is exclusively used for text content. These `Text` nodes 
are the last leaves of our tree, really.  
Which brings us to the second special Element feature mentioned above: `textContent`. This property
is a dynamic getter and setter. The getter will scan their children nodes for `Text` elements, read
their plain text and join them with line breaks. This results in the same thing you know from the 
DOM: The textual representation of an arbitrarily large document section.  
The setter will add a new `Text` element to the node without replacing the existing text.  
This might all sound very abstract, so let's look at an example:

```js
const section =   new Section,
			paragraph = new Paragraph('If you are not too long,'); // this sets the text content directly

console.log(section.textContent); // If you are not too long,

section.textContent = 'I will wait here for you all my life.'; // I will wait here for you all my life.

console.log(section.textContent); // If you are not too long,\nI will wait here for you all my life.

section.prependChild(new Text('True friendship stabs you in the front.'));

console.log(section.textContent); // If you are not too long,\nI will wait here for you all my life.\n
																	// True friendship stabs you in the front.
```


### Element inheritance
There is a strict inheritance hierarchy for all elements. In general, the chain looks like this:

```
[EventEmitter] → [Node] → [Element] → <Element implementation>
                        ↳ [VoidElement] → <Void Element implementation>  
                        ↳ [TextElement] → <Text Element implementation>
```

As you can see, there are three separate element classes:

#### [`Element`](./element/Element.js):  
Elements are the most capable. They implement the attribute mechanism and can contain children.  
Most elements inherit from Element, such as [`Section`](./element/Section.js), 
[`Paragraph`](./element/Paragraph.js) or [`Link`](./element/Link.js).

#### [`VoidElement`](./element/VoidElement.js):
Void elements are elements with attributes, but without children nodes. Examples of void elements 
are [`Image`](./element/Image.js) or [`Separator`](./element/Separator.js).

#### [`TextElement`](./element/TextElement.js):
Text elements are special elements that do not implement attributes and cannot contain children: All
they do is hold a piece of plain text. Currently, the only text elements are 
[`Comment`](./element/Comment.js) and [`Text`](./element/Text.js).


### Creating new elements
As with all parts of Phoenix, you can provide additional elements for your own Phoenix setup or as a
separate module to be installed by Phoenix users. I'd recommend, however, to use existing elements 
wherever possible; Phoenix ships with a wide range of (output agnostic) elements already. Should
you require something not possible with the available elements, you are welcome to open an issue or
provide a PR.  
If you still want to implement a custom element, keep the following rules in mind: 
 1. All elements must be oblivious to the output format. Users should not be restricted to a certain
    output mode dictated by the structural elements their parser uses.
 2. All elements must inherit from the appropriate base class. These exist for a reason - take a 
    look at [Element inheritance](#element-inheritance) to find the best match for your 
    requirements. This makes all elements testable since the base classes provide a common interface
    for other Phoenix modules.
 3. No elements may have side effects. Their only task is to hold content or further elements and 
    describe said content with meta data. If your element is somehow opinionated towards a certain 
    language, maybe a custom parser would be a better fit.


### Working with elements
Both parsers and transformers receive the main document instance. That is the root node you can work
with to create a viable documentation.  
This section gives a little insight on how to actually do so.


#### ...in Parsers
Parsers have the biggest responsibility here: Ultimately they control which parts of source code are
worth of documenting and create an appropriate element for them.  
Usually, you'll have some kind of loop or callback to iterate the source, receiving the individual
symbols. Let's look at the following pseudo-JS, shall we?

```js
for (let symbol of symbols) {
  const symbolSection = new Section();
  symbolSection.appendChild(new Heading(symbol.name));
  symbolSection.appendChild(new Paragraph(symbol.description));

  document.appendChild(symbolSection);
}
```

This iterates over all symbols, creating a section for each of them. Those sections hold a heading
and a paragraph, mapping to the symbol name and description, respectively. This mapping is the most
interesting thing here: Parsers are free to implement this in more complex terms, using schema 
objects, for example. An implementation could check the symbol type and create the section from a
schema that tells it where to put the symbol properties in.


#### ...in Transformers



The `Document` instance
-----------------------
A document inherits from `Node`, therefore, all instances have access to the `Node` properties 
outlined below. Additionally, it provides the following:

### Properties
| Name      | Description                          |
|:---------:|--------------------------------------|
| `title`   | Getter/Setter for the document title |
| `pages`   | Retrieves all child pages            |
| `sources` | Retrieves all source nodes           |

### Methods
| Name      | Arguments                | Description                               |
|:---------:|--------------------------|-------------------------------------------|
| `merge`   | `...documents: Document` | Merges all documents into the current one |
| `addPage` | `name: string`           | Adds a new page to the document           |


Node API
--------
Nodes are the base prototype of any document node type. All node types that inherit from `Node` 
should expose their content properties directly.

### Properties
| Name              | Description                                                      |
|:------------------|:-----------------------------------------------------------------|
| `rootNode`        | Retrieves the root node of the current node                      |
| `length`          | Retrieves the amount of children nodes                           |
| `previousSibling` | Retrieves the previous sibling node                              |
| `nextSibling`     | Retrieves the next sibling node                                  |
| `firstChild`      | Retrieves the first child node                                   |
| `lastChild`       | Retrieves the last child node                                    |
| `isRootNode`      | Checks whether this is the root node in the tree                 |
| `nodeValue`       | Getter/Setter for the node content                               |
| `depth`           | Retrieves the nodes tree depth                                   |
| `nodeType`        | Retrieves the node type (defaults to the class constructor name) |
| `parentNode`      | Retrieves the parent node in the tree                            |

### Methods
| Name                    | Arguments                         | Description                         |
|:------------------------|:----------------------------------|-------------------------------------|
| `appendChild`           | `node: Node`                      | Appends a child node                |
| `prependChild`          | `node: Node`                      | Prepends a child node               |
| `removeChild`           | `node: Node`                      | Removes a child node                |
| `remove`                | none                              | Removes the node                    |
| `traverseUp`            | `iterator: function`              | Traverses the node tree upwards     |
| `traverseDown`          | `iterator: function`              | Traverses the node tree downwards   |
| `find`                  | `predicate: Node/string/function` | Finds a node by a predicate         |
| `getElementsByNodeType` | `nodeType: string`                | Retrieves all child nodes of a type |
| `toArray`               | none                              | Retrieves all child nodes as array  |


### Elements

#### Table
A table element is a little special: It can only directly contain `TableRow` elements. This 
prevents invalid tables right from the start, so Transformer implementors can consider all tables
valid.

#### TableRow
Table rows are the rows of a table, as the name indicates.
