var res = require('./getResponses');

var getPerson = res.getResponsFromConfig('./properties', 'getPerson');
var certant = res.getSpecificRespons('./properties', 'getUser', 'certant');
var comafi = res.getSpecificRespons('./properties', 'getUser', 'comafi');

getPerson.then(x => console.log('\n GetPersona ' + JSON.stringify(x)));
certant.then(x => console.log('\n Certant ' + JSON.stringify(x)));
comafi.then(x => console.log('\n Comafi ' + JSON.stringify(x)));