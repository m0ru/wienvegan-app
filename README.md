# Wienvegan-App

A front-end to the wienvegan list of vegan(-friendly) restaurants and shops.

## Setup

In the app's root run:

    npm install
    ./node_modules/webpack/bin/webpack.js


## Developing

To automatically generate the packed js:

    ./node_modules/webpack/bin/webpack.js --progress --colors --watch

If you want to run a webserver as well instead run:


  ./node_modules/.bin/webpack-dev-server --inline --hot
