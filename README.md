# Chief Toolkit

> A full featured toolkit for compiling js, sass and styleguide


##### Table of Contents  
[Features](#features)  
[Requirements](#requirements)  
[Quick Start](#quickstart)  
[Compiling](#compiling)  
[JavaScript](#javascript)  
[Styleguide](#styleguide)  
[Sass](#sass)  
[Node](#node)  

<a name="features"/>

#### Features
- Gulp
- Webpack
- [Fabricator](https://github.com/fbrctr/fabricator)
- Image minification
- Browser Sync

#### [Toolkit Demo](https://toolkit.clientapp.com)

<a name="requirements"/>

## Global Requirements
- Node
- npm
- gulp

<a name="quickstart"/>

## Quick Start

To create standalone directory named toolkit inside your current folder
```shell
git clone git@github.com:agencychief/toolkit.git yourtoolkit
cd yourtoolkit
npm install
```

To add toolkit files to current folder (theme install)
```
git init
git remote add origin git@github.com:agencychief/toolkit.git
git pull origin master
npm install
rm -rf .git
rm .gitignore
```

<a name="compiling"/>

## Compiling

**Development**: Starts a watch of the toolkit files and initializes Browser Sync 
```
npm start
```

**Production**: Compiles and minifies files for packaging
```
gulp
```

<a name="javascript"/>

## Javascript

**Files location:** src/js

The toolkit utilizes [Webpack](https://webpack.github.io/docs/) for JavaScript management. Webpack allows us to create a modular JavaScript project. 

All js files that are added to the main js folder will be output as a standalone file in the output folder. All js files in subdirectories will not be output as standalone files. The toolkit comes packaged with 4 example standalone JavaScript files: init-carousel.js, init-map.js, init-modal.js, and init-script.js.  

init-script.js is the main js file and is an example which includes component JS files from a subdirectory `includes`. Require functions can be removed or commented out safely if you are not using these components functionality.

### Adding a new module  

#### From NPM 
1. Follow steps outlined in **Node** section below.
2. Add a new JavaScript file to src/js/includes, declare your node_module dependency, and add any custom code.
3. Add your new file as a dependency in init-script.js:
    ```
    require('./includes/my_new_file')
    ```
  
#### Custom Library 
1. Add a new JavaScript file to src/js/includes, and add any custom code.
2. Add your new file as a dependency in init-script.js:
    ```
    require('./includes/my_new_file')
    ```

### Adding a new JavaScript distribution file

1. Add new file to src/js. This will be output into the dist/js folder when compiled.

If you want to add additional folders to output standalone JavaScript files you can modify the `config.src.scripts` settings in the `gulpfile.js` using this pattern
```
'output_folder_name' : 'path_to_the_file',
```

### jQuery  

The toolkit will use jQuery from an external source loaded from a WordPress or Drupal install, or CDN.

<a name="styleguide"/>

## Styleguide

**Files location:** src/styleguide

**New components/elements/pages/structures will be added to the styleguide on compile.** 

### Docs
This directory contains documentation in [Markdown](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet) format.   
Edit existing files or create a new ones related to your unique build.  
Each document will add a section and print the content on the docs page in your styleguide.  

### Fabricator
This directory contains core functionality to generate the styleguide.  
**Reasons you would need to edit these files:**  
1. Add/Change styleguide menu sections  
To update styleguide menu, edit `styleguide/templates/includes/f-menu.html`.
2. Add/Change default wrapper markup for 'Pages'  
To update 'Pages' wrapper markup, edit `styleguide/templates/pages-layout.html`.
3. Add/Change links to resources  
To update reference to resource, edit `styleguide/templates/default.html`.

Fabricator uses [handlebars](https://handlebarsjs.com/expressions.html) syntax in its HTML files. Read the full [documentation of Fabricator](https://github.com/fbrctr/fabricator-assemble).  

### Materials

This directory contains the component files used to build out the styleguide.  
**This is the location where most if not all work in the styleguide is done**  

Materials are organized using [Atomic Design methodology](https://bradfrost.com/blog/post/atomic-web-design/) and correspond with sass organization. 

#### Adding new materials

##### Single file
1. Add HTML file to the material subdirectory.

##### Multiple related/grouped files
1. Create a new directory within one of the material subdirectories.
2. Add HTML files into your new directory.  
All HTML files will be grouped together in a styleguide section labeled with the name of the directory. See `styleguide/materials/elements/button` for an example.

#### Adding new pages
'Pages' are used to prototype pages using a collection of components, elements, and structures.  
New pages should be added in `styleguide/materials/pages` directory. 

1. Add HTML you'd like, and include existing components/elements/structures using [handlebars](https://handlebarsjs.com/expressions.html) syntax. 

See `styleguide/materials/pages/home.html` for an example.

<a name="sass"/>

## Sass

**Files location:** src/sass

### File Organization
Sass files are organized using [Atomic Design methodology](https://bradfrost.com/blog/post/atomic-web-design/)  

Atomic Design outlines 5 stages:  
* **Atoms:** UI elements that can’t be broken down any further and serve as the elemental building blocks of an interface  
* **Molecules:** Collections of atoms that form relatively simple UI components  
* **Organisms:** Complex components that form discrete sections of an interface  
* **Templates:** Components within a layout and demonstrate the design’s underlying content structure  
* **Pages:** Articulate variations to demonstrate the final UI and test the resilience of the design system.  

The toolkit sass structure aligns with these stages to a certain extent:
* **base** one level removed: primarily variables and mixins which can be used in building components, elements, etc 
* **elements** to atoms
* **components** to molecules
* **structures** to organisms


### Breakpoints
We encourage mobile-first best practices for media queries, but include some other beneficial breakpoints declarations.

The toolkit includes [breakpoint-sass](https://www.npmjs.com/package/breakpoint-sass) to handle the writing of media queries. Call it using the `breakpoint` mixin:
```
@include breakpoint($variable){
  // Your styles here
}
```

**The toolkit has 9 breakpoint variables defined out of the box:**  
$min-width  
$mobile  
$lg-mobile  
$tablet  
$tablet-only  
$all-devices  
$desktop  
$desktop-only  
$lg-desktop

Check src/sass/base/_breakpoint.scss for values

### Including a third party library

1. Follow steps outlined in **Node** section below.
2. Open gulpfile.js, find `includePaths`, and add the path to the library's stylesheet directory to this array.
    ```
    'node_modules/name_of_library/path/to/stylesheets'
    ```
3. Open styles.scss and import the library at the top of the file.
    ```
    // Add third party library
    @import name_of_library
    ```


### Promoting Accessibility

When developing please keep accessibility in mind. Elements should be keyboard accessible and have focus states. Additionally, remember to check the color contrast when using a background color.

<a name="node"/>

## Node

#### Install a new node module
Saves the files into the node_modules folder and adds them to the package.json file as a dev dependency
```
npm install module_name --save-dev
```
or from github
```
npm install git://github.com/USERNAME/PROJECT.git --save-dev
```

#### Uninstall a node module
Removes the files from the node_modules folder and also removes the dev dependency from the package.json file
```
npm uninstall module_name --save-dev
```

#### Shrinkwrap
Use this [shrinkwrap](https://docs.npmjs.com/cli/shrinkwrap) when development is done to lock specific versions of modules for maintenance
```
npm shrinkwrap --dev
```
