# Masque wireframes

## Development

### Install & run
- Clone the repository:

    ```bash
    git clone git@gitlab.com:masque-app/wireframe.git && cd wireframe
    ```
- Install dependencies via Node package manager:

    `npm install`

- Run dev server

    `npm run dev`

    This will automatically launch a browser instance/tab with address http://localhost:3000 using [browsersync](https://www.browsersync.io/). To change the port set environment variable PORT to another port number:
    
    e.g. 
    ```bash
    PORT=8080 npm run dev
    ``````

  Browsersync proxies actual dev server running by default on http://localhost:3001 (PORT+1) to synchronise changes to browsers as they happen during development. 

### Building html and Javascript files

**Html**

This project uses [Nunjucks](https://mozilla.github.io/nunjucks/templating.html) for static html file generation with template inheritance. Template files are located under `src/templates`. 

When dev server is up and running html files are watched for changes and are automatically rendered saving outputs to `dist` folder.

In order to run a one time build you can run `npm run build-html`.

**Javascript**

[Browserify](http://browserify.org/) is the tool of choice for bundling javascripts files together to produce a single main javascript file.

With the dev server running `src/js/main/main.js` file is bundled with browserify and all changes made to any javascript files included in main.js files are detected and reflected to the target output file (dist/js/main.js) with the help of a browserify plugin (watchify).

Dev build does not do any minification/optmisation and include souce map files for client side debugging if necessary.

On the other hand, for production build bundle js file is minified when outputted to target build folder.


### Projects structure


Project structure is as follow:

```sh
bin  # Project binaries
dist # Project target output
src
  asset/  # assets, all files under this folder will be copied under dist/assets at build time
  js/     # Internal javascript libraries
    main/ 
      main.js # main js files to be bundled, require all files in main js and it will be bundled with browserify
  templates/ 
    layouts/ # Layouts that are meant to be extended
    views/  # views to be rendered and saved under dist/views folder
    partials/ # partials that are meant to be used with Nunjucks include 
```


Changes on all html files under are automatically reflected to connected browsers when files are changed.

Note that all files that are partials and layouts which are not standalone pages must start with _(underscore) to avoid saving file as a page under dist folder as [nunjucks-cli](https://github.com/jeremyben/nunjucks-cli) used to render and watch html templates requires this syntax to skip these files. It will still watch all changes in all templates but only save output of html files (keeping existing folder structure) to dist/views folder to serve with http server.
