'use strict'
const responses = require('configure-mocks');

async function obtenerPersonas(req, res) {
    await responses.getResponsFromConfig('./properties', 'getPerson', 'http://localhost:9000/model').then(x => {
        return res.status(x.status).json(x.body);
    });
}

module.exports = {
    obtenerPersonas: obtenerPersonas
}