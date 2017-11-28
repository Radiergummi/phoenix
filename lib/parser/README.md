Parsers
=======
Parsers fulfill the biggest role in Phoenix: Parsing source code into an abstract syntax tree (AST) and generating a document from it. While this could have been split up into two steps, it would have made things more complex: If a simple property has a special meaning in a certain context and should be placed into a common section, how would the parser tell the *"interpreter"* about it? You would have to bundle the parser and the interpreter together to provide a meaningful functionality. That's why those two steps are unified.  
Parsers can harness the power of existing solutions: There is *JSDoc* for building an AST from JavaScript files, or Babylon, the AST parser Babel uses. In fact, there are many available AST builders even for foreign languages like PHP, Ruby or Python.  
Turning that AST into a Document is the actual task a parser has to take care of.

You can find the parser API documentation [below](#parser-api). If you intend to build your own parser, you should take a look at the [JsParser source](./JSDocParser.js).

Subset parsing
--------------
All parsers have an `accepts()` method available. This allows them to filter the files they parse, so `.php` files will only be parsed by the `PhpParser`, `.js` files will be exclusively evaluated by the `JsParser`. This method will use the `accepts` property of the parser options, which should be defined in the default options. This allows you to stay flexible: While a parser author can provide a sensible default, it's user can just overwrite it if necessary.  
The property can be a string, regex or even a callback. Callbacks receive the full source object, strings and regexes will be validated against the source name.


Parsing framework specific code
-------------------------------
Many available frameworks provide specific concepts, like *components* or *routes*. Phoenix' parsers can be easily used to parse even those files - even if they're just ordinary JavaScript code (or any other language at that) - and provide further information.  

Let's look at a straight forward example: Your everyday express application.  
Typically, you will have a bunch of routes that reside in some files in `routes/`. Using the `accepts()` method, you can specifically look for these files, since the file path is passed to it: Simply specify a regex pattern that matches common route files in the parsers default options, so users of your parser can modify it, if necessary.


Ideas for parsers
-----------------
Possible parsers to include in Phoenix:

 - VueComponentParser:  
   *Parses Vue.js [single component files](https://vuejs.org/v2/guide/single-file-components.html)*
 - ReactComponentParser:  
   *Parses React [JSX components](https://reactjs.org/docs/components-and-props.html)*
 - AngularComponentParser:  
   *Parses Angular components*
 - ES7Parser:  
   *Uses [Babylon](https://github.com/babel/babel/tree/master/packages/babylon) to parse next generation JavaScript*
 - ElectronParser:  
   *Parses electron apps*
 - ExpressAppParser:  
   *Parses express routes, controllers and models*
 - PhpParser:  
   *Uses [php-parser](https://github.com/glayzzle/php-parser9) to parse PHP code*
 - PythonParser:  
   *Uses [Filbert](https://github.com/differentmatt/filbert) to parse Python code*
 - RubyParser:  
   *Uses [???](#) to parse Ruby code*
