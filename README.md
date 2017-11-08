# Chief Toolkit

> A full featured toolkit for compiling js, sass and styleguide

#### Features
- Gulp
- Webpack
- [Fabricator](https://github.com/fbrctr/fabricator)
- Image minification
- Browser Sync

#### [Toolkit Demo](http://toolkit.clientapp.com)

## Global Requirements
- Node
- npm
- gulp

## Quick Start

To create standalone directory named toolkit inside your current folder
```shell
git clone https://github.com/agencychief/toolkit.git yourtoolkit
cd yourtoolkit
npm install
```

To add toolkit files to current folder (theme install)
```shell
git init
git remote add origin https://github.com/agencychief/toolkit.git
git pull origin master
npm install
rm -rf .git
rm .gitignore
```


## Compiling

**Development**: Starts a watch of the toolkit files and initializes Browser Sync 
```shell
npm start
```

**Production**: Compiles and minifies files for packaging
```shell
gulp
```


## Javascript

**Files location: src/js**

The toolkit utilizes [Webpack](https://webpack.github.io/docs/) for JavaScript management. Webpack allows us to create a modular JavaScript project. 

The toolkit comes packaged with 4 compiled JavaScript files: carousel.js, map.js, modal.js, and script.js. The purpose of having a separate file for carousel, map, and modal is so these files can be included only on pages where they are needed.  

init-script.js is the main js file and is being used to import JS files from src/js/includes. Require functions can be removed if you are not using a particular functionality.

All custom JS code should be written in init-script.js, or in the appropriate toolkit file (i.e. accordion.js can be updated to match your specific use case).

**Adding a new module:**  

- From NPM: 
  - Follow steps outlined in **Node** section below
  - Add a new JavaScript file to src/js/includes, declare your node_module dependency, and add any custom code
  - Add your new file as a dependency in init-script.js (e.g. ```require('./includes/my_new_file')```)
  
- Custom Library: 
  - Add a new JavaScript file to src/js/includes, and add any custom code
  - Add your new file as a dependency in init-script.js (e.g. ```require('./includes/my_new_file')```)

**Adding a new JavaScript distribution file**

1. Add new file to src/js
2. Open gulpfile.js and find ```var config```. This is where you define files to be compiled.
3. Add your new file property to the scripts object (e.g. ```new_file : 'path/to/file'```)  
4. Open webpack.config.js and find ```entry```. This is where you define where in the dist directory the new file will be placed, and the name of the output file itself.
5. Add an entry for your new file (e.g. ```'location/finalScriptName': gulpConfig.src.scripts.new_file```)

**Including jQuery**  

The toolkit will use jQuery from an external source loaded from a WordPress or Drupal install, or CDN.


## Styleguide

**Some Notes on...**
- Organization/location of files
- how to add a new material or page
- uses [handlebars](http://handlebarsjs.com/expressions.html) syntax
- Read full [documentation of Fabricator](https://github.com/fbrctr/fabricator-assemble)  


## Sass

**Some Notes on...**
- Organization using the atomic css modal
- Breakpoints
- promote accesibility best practices


## Node

#### Install a new node module
Saves the files into the node_modules folder and adds them to the package.json file as a dev dependency
```shell
npm install module_name --save-dev
```
or from github
```shell
npm install git://github.com/USERNAME/PROJECT.git --save-dev
```

#### Uninstall a node module
Removes the files from the node_modules folder and also removes the dev dependency from the package.json file
```shell
npm uninstall module_name --save-dev
```

#### Shrinkwrap
Use this [shrinkwrap](https://docs.npmjs.com/cli/shrinkwrap) when development is done to require specific version of modules for maintenance
```shell
npm shrinkwrap --dev
```
