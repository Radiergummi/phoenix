Phoenix
=======
*A lightweight and modular framework to document code projects*


Reasoning
---------
Born out of frustration while working on a Vue.js project, I decided to write something on my own. 
The amount of work to generate documentation for a simple project involving Vue.js components seemed
tedious to me: While there are certain packages that parse single file components, it seemed near 
impossible to get them to play nice with JSDoc or similar.  
What lacks to date is a modular framework that clearly separates parsing sources from writing output
files.  

Welcome to Phoenix.


Abstract Concept
----------------
Phoenix consists of five core building blocks:

1. **Readers**
   Readers are the first step in the chain: They *read source files*, obviously. By default, there 
   are only readers for STDIN and the file system, though you could create additional ones to read 
   from a deployment server, an HTTP resource or a Github repository.  
   [Continue reading...](./lib/reader/README.md)
   
2. **Parsers**  
   A parser *parses source code* and returns it as a *JavaScript representation*. It's sole 
   responsibility is to analyze the code passed to it as a string and return a `Document` (more on 
   that below). You might note this is not limited to JavaScript source: 
   A parser can parse any language.  
   [Continue reading...](./lib/parser/README.md)


3. **Transformers**  
   A transformer takes the previously generated document object and
   *transforms them into an output format*.  
   This might be HTML, XML, Markdown or even binary ASCII code if that's your thing.  
   [Continue reading...](./lib/transformer/README.md)


4. **Writers**  
   A writer takes the output data and *writes it to a target*. By default, as with readers there are
   only writers for STDOUT and the file system, but you could easily create one that writes to an S3
   bucket, a database or a git repository.  
   [Continue reading...](./lib/writer/README.md)

   
5. **Documents**  
   The Document object is an abstract representation of the documentation. Similar to the document
   in browsers, it is a tree structure with infinitely nested nodes. This makes it possible to
   document even the biggest projects cleanly.  
   [Continue reading...](#documents)


Therefore, the chain works as follows:
> **read input** → **parse input** → **transform AST** → **write output**  

Phoenix makes it possible to document just about anything, as long as it can be parsed using 
JavaScript.


Core principles
---------------
1. **Ease of use**: For the 90% use case, you should be able to install phoenix, pass it an input
   path and get your documentation.
2. **Modularity**: Extending Phoenix should be as easy as extending one of the abstract classes and
   pass the name as an option.
3. **Interoperability**: Phoenix should play nice with other tools, including CI servers, build
   chains and system tools.
4. **Implementation agnostic**: Phoenix should be able to read from anywhere, parse anything, build
   any output and write to anywhere. No limits.
5. **Stability**: New versions should follow Semver strictly and deprecate things slowly.


Installation
------------
> Note: Phoenix is currently in initial development and not ready for use at the moment. If you plan
to contribute, please have a look at the [Contributing section](#contributing).

Install the module:

```bash
// from the npm registry
npm install phoenix-docs

// from Github
npm install Radiergummi/phoenix
```


Usage
-----
By default, the only thing required is calling `run()` on a configured Phoenix instance. That will 
read the input and write documentation output. If you want to customize, whoever, the API is at your
hands at all times in the build process.
The API is available in two flavors: Either *event based* or *promise based*.
Every module is obliged to return a promise and emit events at certain points in the flow. You are 
not bound to one, of course: Promises and events mix just fine.

### Simple usage

```js
const phoenix = new Phoenix(options);

phoenix.run();
```

### Using Promises

```js
const phoenix = new Phoenix(options);

phoenix.createDocument('my project title')

// we can read arbitrary glob paths here if we use the FileSystemReader
.then(document => phoenix.read(['path1', 'path2']))

// at this point, we have an array of objects that describe all of our source files
.then(sourceFilesContent => phoenix.parse(sourceFilesContent))
	
```

Point of the code examples being, you can intervene at any point in the pipeline and do your thing 
with the current results, then continue.

### Using events
No surprises with event emitters: I used the ordinary `events` module. Phoenix emits all sorts of 
events, all of which you can find [in the table below](#event-list). You can hook into them and 
modify the current results at any time.

```js
const phoenix = new Phoenix(options);

phoenix.on('read:after', sourceFilesContent => console.log(sourceFilesContent));

phoenix.run();
```


Documents
---------
What would be the best way to maintain an output agnostic data format for documentation? It's 
already in there: A `Document`. And yes, it's similar to your everyday browser document, just a 
little stripped down and optimized for the use case.  
The Document object resembles a tree structure that holds nested document nodes. There is a basic
preset of different node types, but you can of course create new node types based on the existing.
The task of a transformer is to transform the document nodes into the output nodes. Consider this:
A `section` node might directly map to the `<section>` tag, while in markdown, it's just a new line.
An Overview of the `Document` API can be found in the 
[Document API documentation](./lib/document/README.md).


#### Event list
**This section is, as the whole project, still a work in progress.**

| Name     				  | Event properties | Description |
|:------------------|:-----------------|:------------|
| init      				| `ENV`, `options` | Phoenix initialisation. Receives current environment and the options Phoenix has retrieved from `ENV`, a CLI parameter or config file. 																	       |
| read:before 			|  | Before any read operation happens. 						 |
| read:init 				|  | When all read instances have been created. 		 |
| read:file 				|  | When a file is read. 													 |
| read:directory 		|  | When a directory is read. 											 |
| read:done 				|  | When all read operations have started. 				 |
| read:after      	|  | After all read operations are finished. 				 |
| parse:before      |  | Before any parse operation happens. 						 |
| parse:init      	|  | When all parse instances have been created.     |
| parse:file 				|  | When a file is parsed. 											   |
| parse:symbol 			|  | When a symbol is parsed. 											 |
| parse:method 			|  | When a method is parsed. 											 |
| parse:property 		|  | When a property is parsed. 										 |
| parse:class 			|  | When a class is parsed. 												 |
| parse:done 				|  | When all parse operations have started. 				 |
| parse:after 			|  | After all parse operations are finished. 			 |
| transform:before  |  | Before any transform operation happens.	 			 |
| transform:init 	  |  | When all transform instances have been created. |
| transform:file    |  | When the transform of a file is created. 			 |
| transform:section |  | When the transform of a section is created. 		 |
| transform:done    |  | When all transform operations have started. 		 |
| transform:after   |  | After all transform operations are finished. 	 |
| write:before 			|  | Before any write operation happens. 						 |
| write:init 				|  | When all write instances have been created. 		 |
| write:file 				|  | When a file is written. 												 |
| write:directory  	|  | When a directory is created. 									 |
| write:done				|  | When all write operations have started. 				 |
| write:after				|  | After all write operations are finished. 			 |

Additionally, each module has the possibility of emitting their own events. They will be proxied to
the Phoenix instance as `{{module prototype name}}:{{module class name}}:{{event name}}`. For 
example, should a transform module that creates XML output (*"FoobarXMLTransformer"*) emit a 
`newNode` event, it would be emitted like so: `transform:foobarxmltransformer:newNode`.


Terminology
===========
Phoenix uses several terms that might sound unfamiliar at first. This is necessary to distinguish 
between several states the subject code can take and to stay technology agnostic.

### Origin
An *origin* is a place to pull [sources](#source) from. This might be a file path, a database 
connection or a remote URI.
   
### Source
A *source* is an object representing a code fragment. At minimum, it has two properties: `name` and 
`code`, where `name` is the source identifier (for example a file path) and `code` is the actual 
source code that is subject to documentation.
   
### AST
*AST* is an abbreviation for *Abstract Syntax Tree*. It represents the abstract structure of any 
kind of source code. You can read more on the topic over at 
[Wikipedia](https://en.wikipedia.org/wiki/Abstract_syntax_tree).

### Documentation object
In lieu of a better word, I decided to call transformed documentation snippets (already in their
target output format) *objects*. This might be subject to change, though.  
An *object* refers to a [document node](#node) that holds transformed documentation text.

### Node
*Nodes* represent a single branch in the tree structure of a [document](#document). They can hold 
children nodes themselves and are roughly comparable to the 
[Browser node object](https://developer.mozilla.org/en/docs/Web/API/Node).

### Document
The *Document* class is the heart of Phoenix. The whole process of reading, parsing, transforming 
and writing code and documentation focuses on modifying a single `document` instance that holds the
origins, sources, documentation objects and output fragments.

Contributing
------------
Contributions are welcome at any time. If you're experiencing a problem with Phoenix, please 
[create a new issue](https://github.com/Radiergummi/phoenix/issues/new).  
Before submitting a new pull request, please read [CONTRIBUTING.md](./CONTRIBUTING.md) for details 
on our code of conduct and the process for submitting pull requests.
