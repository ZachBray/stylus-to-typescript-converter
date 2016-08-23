#!/usr/bin/env node

var commandLineArgs = require('command-line-args');
var commandLineUsage = require('command-line-usage');
var Parser = require('stylus').Parser;
var fs = require('fs');
var Renamer = require('./src/renamer.js');
var Converter = require('./src/converter.js');

var optionList = [{
  name: 'input',
  alias: 'i',
  type: String,
  typeLabel: '[underline]{file}',
  description: 'The path to a Stylus file to convert to TypeScript.'
}, {
  name: 'output',
  alias: 'o',
  type: String,
  typeLabel: '[underline]{file}',
  description: 'The path where the generated TypeScript output will be written.'
}, {
  name: 'verbose',
  alias: 'v',
  type: Boolean,
  description: 'Enables verbose logging.'
}, {
  name: 'doubleQuotes',
  type: Boolean,
  description: 'Enables double quotes around strings in generated output.'
}];

var usage = commandLineUsage([{
  header: 'Stylus to TypeScript Converter (STSC)',
  content: 'Converts Stylus variables and classes to TypeScript.'
}, {
  header: 'Options',
  optionList: optionList
}]);

var options = commandLineArgs(optionList);

if (!options.input || !options.output) {
  console.log(usage);
  return 1;
}

var trace = options.verbose ? console.log : (function() {});

var attempt = function(description, f) {
  try {
    return f();
  } catch (e) {
    console.error('Failed to ' + description);
    trace(e);
    console.log(usage);
    process.exit(1);
  }
}

var stylusContent = attempt('read input file', function () {
  return fs.readFileSync(options.input, 'utf8');
});

trace('Read input file\n', stylusContent);

var ast = attempt('parse input file', function () {
  var parser = new Parser(stylusContent);
  return parser.parse();
});

trace('Parsed AST\n', ast);

var generatedCode = attempt('convert Stylus AST', function () {
  var renamer = new Renamer();
  var converter = new Converter(trace, renamer, ast, {
    useDoubleQuotes: options.doubleQuotes 
  });
  return converter.convert();
});

trace('Converted Stylus AST to TypeScript\n', generatedCode);

attempt('write generated TypeScript', function () {
  fs.writeFileSync(options.output, generatedCode, 'utf8');
});

trace('Finished');
