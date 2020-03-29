var res = require('./getResponses');

var getPerson = res.getResponsFromConfig('./properties', 'getPerson', 'http://localhost:9000/model');
var certant = res.getSpecificRespons('./properties', 'getUser', 'http://localhost:9000/model', 'certant');
var comafi = res.getSpecificRespons('./properties', 'getUser', 'http://localhost:9000/model', 'comafi');

getPerson.then(x => console.log('\n GetPersona ' + JSON.stringify(x)));
certant.then(x => console.log('\n Certant ' + JSON.stringify(x)));
comafi.then(x => console.log('\n Comafi ' + JSON.stringify(x)));
