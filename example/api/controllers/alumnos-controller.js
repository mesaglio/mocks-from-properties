'use strict'
const responses = require('configure-mocks');

async function obtenerAlumnos(req, res) {
    var id = req.query.id;
    await responses.getSpecificRespons('./properties', 'getUser', 'http://localhost:9000/model', id).then(x => {
            return res.status(x.status).json(x.body);
        })
        .catch(err => {
            return res.status(500).json(err.message);
        });
}

module.exports = {
    obtenerAlumnos: obtenerAlumnos
}