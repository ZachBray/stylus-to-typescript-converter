# Stylus to TypeScript Converter

Converts very basic `.styl` files into `.ts` files.

## Basic usage

```
npm install -g stylus-to-typescript-converter
stsc -i ./my-style.styl -o ./my-styl.ts
```

## Gotchas

This converter only supports very basic stylus features. See the example folder to see what we've tested it on. It is intended for use with design artefacts like Zeplin style guides as a basis for using inline styles with React.
