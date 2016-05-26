(function () {
    'use strict';
}());

var express = require('express');
var app = express();

var port = process.env.PORT || 9002;

var environments = {
    "dev": "src",
    "prod": "dist"
};

var env = "dev";
if (process.argv.length > 2) {
    if (process.argv[2] === "prod") {
        env = "prod";
    }
}

app.use('/hearthstone-art', express.static(__dirname + '/' + environments[env]));

app.listen(port);

console.log('Environment set to ' + env);
console.log('Static files served from ' + environments[env] + '/ directory');
console.log('Server listening on port ' + port);