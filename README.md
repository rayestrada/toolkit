# Trestlemedia Toolkit

> A full featured toolkit for compiling js, sass and styleguide

#### Features
- Gulp
- Webpack
- [Fabricator](https://github.com/fbrctr/fabricator)
- Image minification
- Browser Sync

#### [Toolkit Demo](http://webpack.clientapp.com)


## Quick Start

```shell
git clone https://github.com/rayestrada/toolkit.git
npm build
```


## Compiling

**Development**: Starts a watch of the toolkit files and initializes Browser Sync 
```shell
gulp --dev
```

**Production**: Compiles and minifies files for packaging
```shell
gulp
```


## Javascript

**Some Notes on...**
- how webpack is being used
- how to add new plugins/modules
- where to locate/write scripts
- how jquery can be used or included
- promote no script fallback best practices


## Styleguide

**Some Notes on...**
- Organization/location of files
- how to add a new component or material
- uses [handlebars](http://handlebarsjs.com/expressions.html) syntax
- Read full [documentation of Fabricator](http://fbrctr.github.io/docs/)  


## Sass

**Some Notes on...**
- Organization using the atomic css modal
- Breakpoints
- promote accesibility best practices
