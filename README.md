# api-tests

### Setting up the environment

### Windows OS
1. Install [nodeJS] (https://nodejs.org/en/download/) 

### Mac OS
1. Install [nodeJS] (https://nodejs.org/en/download/)

## IDE need to be installed
1. Install [VS CODE] (https://code.visualstudio.com/download)

## Plugins need to be updated

Install the below plugins
1. SuperTest
2. Mocha
3. Chai
4. Babel
5. mochawesome (for reporting)

### Command to install all this plugins

npm i --save-dev supertest mocha chai mochawesome @babel/cli @babel/core @babel/node @babel/register @babel/preset-env @babel/plugin-transform-runtime

### Run the tests

npm test

### Run the tests with mochawesome reporter

npm test -- --reporter mochawesome
