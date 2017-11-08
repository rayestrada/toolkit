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

**Files location: src/sass**

**File Organization**

Sass files are organized using [Atomic Design methodology](http://bradfrost.com/blog/post/atomic-web-design/). Atomic Design outlines 5 stages:
1. **Atoms:** UI elements that can’t be broken down any further and serve as the elemental building blocks of an interface
2. **Molecules:** Collections of atoms that form relatively simple UI components
3. **Organisms:** Complex components that form discrete sections of an interface
4. **Templates:** Components within a layout and demonstrate the design’s underlying content structure
5. **Pages:** Articulate variations to demonstrate the final UI and test the resilience of the design system.

The Sass structure mirrors these stages to a certain extent:
* **base** one level removed: primarily variables and mixins which can be used to build components, elements, etc 
* **components** to atom
* **elements** to molecules
* **layouts** to organisms
* **structures** to templates


**Breakpoints**

The toolkit has 9 breakpoints defined out of the box:
1. $min-width (320px)
2. $mobile (max-width: 500px)
3. $lg-mobile (501px - 760px)
4. $tablet (min-width: 761px)
5. $tablet-only (761px - 1023px)
6. $all-devices (max-width: 1023px)
7. $desktop (min-width: 1024px)
8. $desktop-only (1024px - 1440px)
9. $lg-desktop (min-width: 1440px)

The toolkit includes [breakpoint-sass](https://www.npmjs.com/package/breakpoint-sass) to handle the writing of media queries. Call it using the ```breakpoint``` mixin:

```shell
@include breakpoint($variable){}
```

**Including a third party library**

1. Install the node module and save it as a dev dependency
    ```shell
    npm install --save-dev name_of_library
    ```

2. Open gulpfile.js, find ```includePaths```, and add the path to the library's stylesheet directory to this array
    ```shell
    'node_modules/name_of_library/path/to/stylesheets'
    ```

3. Open styles.scss and import the library at the top of the file
    ```shell
    @import name_of_library
    ```


**Promoting Accessibility**

When developing please keep accessibility in mind. Elements should be keyboard accessible and have focus states. Additionally, remember to check the color contrast when using a background color.


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
