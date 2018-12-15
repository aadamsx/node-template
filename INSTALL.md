# About

This is a node.js only tempate for getting started using GraphQL or Express server side.  As such there are no front end considerations given to this template.

This template makes use of the following:
* Babel 7
* Webpack 4 only for bundling
* TypeScript 3
  
Note: For a frontend template you can find one at [...]

# Features

* babel: transpiling from ES6, ES7+ to ES5
* webpack: bundling the source to a bundle.js
* live compiling: as well as live reload
* custom .vscode: added custom vscode configuration to allow easy debugging of the source inside Visual Studio Code


# Installation Tasks

## NPM

```
> npm init
```
This will create a ```package.json``` file for you in the root of your project directory.

## Git

```
> git init -yes
```

your package.json file should look something like this.

```json
{
  "name": "Project Name",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "Your Name,
  "license": "ISC"
}
```
Now add a .gitignore file to  your projects root directory.

```
> touch .gitignore
```

And add ```node_modules``` to the file

> node_modules

## Application Structure

Please add the following basic structure to you application.  

```
your-project-directory
|--src
|  |--index.js
|--package.json
|--.babelrc
```

If you initilized your project with ```npm``` earlier, then the package.json file should already be created for you.

To create your ```./src``` directory and the index.js file below, run the following command from your ```root``` directory.

```
> mkdir -p ./src && touch ./src/index.js && touch .babelrc
```

Note: The ```.babelrc``` & ```server.js``` files will remain empty for now.


## Babel 7

```
> yarn add -D babel-loader @babel/core @babel/cli @babel/preset-env @babel/node 
> yarn add source-map babel-loader
```

Create a .babelrc file for configuration settings

```
> touch .babelrc
```

Your project should now look like this.

```
your-project-directory
|--node_modules
|--src
|  |--server.js
|--package.json
|--.babelrc
```

Now it's time to add the configuration to your ```.babelrc``` file.

```json

{
  "presets": ["@babel/env"],
  "retainLines": true
}
```

Note: The ```preset``` portion of ```preset-env``` is implied and is not neccessary here.

## Webpack

We add webpack for bundling only.

```
> yarn add -D webpack webpack-cli
```

Now add a webpack.config.js file to your root directory
```
> touch webpack.config.js
```

Add the following configuration to this file

```javascript
const path = require('path');

module.exports = {
    entry: [
      'regenerator-runtime/runtime',
      './src/index.js'
    ],
    target: 'node',
    devtool: 'source-map',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js',
        publicPath: 'dest/'
    },
    module: {
        rules: [
            {
                use: 'babel-loader',
                exclude: /(node_modules)/,
                test: /\.js$/
            }
        ]
    }
}
```

## Tools

Install a CLI tool to run multiple npm-scripts in parallel or sequential.

```
> yarn add -D npm-run-all
```

~~Install a standalone runtime for [Regenerator](https://github.com/facebook/regenerator/tree/master/packages/regenerator-runtime)-compiled generator and async functions > yarn add -D regenerator-runtime~~

## Development

To make development easier, we'll use ```nodemon``` package, which reloads node for us automatically when one of our files is changed.

```
> yarn add -D nodemon
```

## Environment Variables in Node.js

It is important to set data like private API keys and user credentials like password, username, and email as environmental variables, but without exposing them in the source code. For this, we put environmental variables in a dedicated file that is safe from external access. The ```.env``` file lets you set Node.js environment variables as accessible in your project’s source code. On the command line, in your project’s root folder, create a ```.env``` file.

```
> touch .env
```

Now you can place any key value pair that you don’t want in your source code in this new file.

> MY_DATABASE_PASSWORD=mysupersecretpassword

[dotenv](https://github.com/motdotla/dotenv) is another helpful library to make environmental variables accessible in the source code. First, install it on the command line as a normal dependency:

```
> yarn add dotenv
```

import it into your ```src/index.js``` file to initialize it. The environment variable from your ```.env``` file is now accessible in your source code.

```javascript
import 'dotenv/config';

console.log('Hello Node.js project.');

console.log(process.env.MY_DATABASE_PASSWORD);
```

## Scripts to package.json

It's time to set up your scripting capabilites for development and builds.

* Add ```nodemon --exec babel-node src/index.js``` as the startscript. This tells the nodemon package to watch for file changes, reload when it detects them and use babel-node to run the file src/server.js. We’ll use this while developing locally.

* Add ```babel src —-out-dir dist``` as the build script. This tells babel to compile the files from the src directory and place them in the dist directory.

* Add ```node dist/index.js``` as the serve script. This enables us to run our compiled code on a server, the reason we are not just using nodemon for this is it uses quite a bit more memory than just using node and adds some startup time to the process which is fine for some applications but can be a huge performance hit in others.


Add the following scripts to your ```package.json``` file.

With webpack:
```json
  "main": "webpack.config.js",
  "scripts": {
    "build": "webpack",
    "start": "npm-run-all --parallel watch:server watch:build",
    "watch:build": "webpack --watch",
    "watch:server": "nodemon --inspect=\"9229\" \"./build/bundle.js\" --watch \"./build\" "
  },
```

WithOUT webpack:

```json
{
  "main": "src/index.js",
  "scripts": {
    "start": "nodemon --exec babel-node src/index.js",
    "build": "babel src --out-dir dist",
    "serve": "node dist/index.js"
  }

```

## Start your engines!

To make sure your project has all the build dependencies run the following

```
> yarn
```

To do your first build (with NPM or you'll get warnings)

```
> npm run build
```



# Dependencies List Links
[@babel/cli](https://babeljs.io/docs/en/babel-cli)
  
[@babel/preset-env](https://babeljs.io/docs/en/babel-preset-env)

[@babel/node](https://babeljs.io/docs/en/babel-node)

[@babel/core](https://babeljs.io/docs/en/babel-core)

[nodemon](https://nodemon.io/)

[dotenv](https://github.com/motdotla/dotenv)

[npm-run-all](https://github.com/mysticatea/npm-run-all)

[regenerator-runtime](https://github.com/facebook/regenerator/tree/master/packages/regenerator-runtime)




# TypeScript installation and configuration changes:

```
> yarn add typescript ts-loader inline-source-map
> touch tsconfig.json
```

Changed webpack config

```javascript
var path = require('path');
module.exports = {
    entry: './src/index.ts',
    devtool: 'inline-source-map',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js'
    },
    resolve: {
      extensions: ['.ts'] //resolve all the modules other than index.ts
    },
    module: {
        rules: [
            {
                use: 'ts-loader',
                test: /\.ts?$/
            }
        ]
    }
}
```

Typescript config additions

```json
{
  "name": "node-typescript-webpack-starter",
  "version": "1.0.0",
  "description": "",
  "main": "index.ts",
  "scripts": {
    "start": "npm-run-all --parallel watch:server watch:build",
    "watch:server": "nodemon \"./build/bundle.js\" --watch \"./build\" ",
    "watch:build": "webpack --watch",
    "build": "webpack",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "nodemon": "^1.12.1",
    "npm-run-all": "^4.1.1",
    "ts-loader": "^3.0.5",
    "typescript": "^2.5.3",
    "webpack": "^3.8.1"
  }
}
{
    "compilerOptions": {
      "outDir": "./build/",
      "noImplicitAny": true,
      "target": "es5",
      "sourceMap": true,
      "allowJs": true
    }
  }
}
```

Changed package config

```json

{
  "name": "node-typescript-webpack-starter",
  "version": "1.0.0",
  "description": "",
  "main": "index.ts",
  "scripts": {
    "start": "npm-run-all --parallel watch:server watch:build",
    "watch:server": "nodemon \"./build/bundle.js\" --watch \"./build\" ",
    "watch:build": "webpack --watch",
    "build": "webpack",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "nodemon": "^1.12.1",
    "npm-run-all": "^4.1.1",
    "ts-loader": "^3.0.5",
    "typescript": "^2.5.3",
    "webpack": "^3.8.1"
  }
}
```




