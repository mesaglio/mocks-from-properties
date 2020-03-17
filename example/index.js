const express = require('express');
const app = express();
const appService = require('swagger-app-mw');

/**
 * config
 */
const port = 3000;
var config = {
    appRoot: __dirname,
    logPaths: false
};
var swaggerApps = [{
    basePath: '/',
    swaggers: ["./api/swagger/swagger.yaml"]
}];

appService.configurateSwaggerApps(config, app, swaggerApps);

app.listen(port, function() {
    console.log("Server is running on " + port + " port");
});