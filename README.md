# Stylus to TypeScript Converter

Converts very basic `.styl` files into `.ts` files.

## Basic usage

```bash
npm install -g stylus-to-typescript-converter
stsc -i ./my-style.styl -o ./my-styl.ts
```

## General usage instructions

```bash
> stsc

Stylus to TypeScript Converter (STSC)

  Converts Stylus variables and classes to TypeScript. 

Options

  -i, --input file    The path to a Stylus file to convert to TypeScript.             
  -o, --output file   The path where the generated TypeScript output will be written. 
  -v, --verbose       Enables verbose logging.                                        
  --doubleQuotes      Enables double quotes around strings in generated output.
```

## Gotchas

This converter only supports very basic stylus features. See the example folder to see what we've tested it on. It is intended for use with design artefacts like Zeplin style guides as a basis for using inline styles with React.
