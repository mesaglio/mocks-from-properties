var PropertiesReader = require('properties-reader');
var request = require('request-promise');

function getModelsFromConfig(file) {
    var properties = PropertiesReader(file);
    var models = JSON.parse(properties.get('models.all'));
    var modelos = {};
    models.forEach(model => {
        var propiedades = JSON.parse(properties.get(`models.${model}.props`));
        var propiedadesDatos = JSON.parse(properties.get(`models.${model}.props.type`));
        var objeto = {};
        propiedades.forEach((key, i) => {
            objeto[key] = propiedadesDatos[i]
        });
        modelos[model] = objeto;
    });
    return modelos;
};

function getModelFromModles(modelName, file) {
    var _modelName = modelName.replace('\"', '');
    var modelos = getModelsFromConfig(file);
    if (modelos[_modelName] === undefined)
        throw "El modelo no esta definido en archivo de propiedades"
    return modelos[modelName];
}

function getResponsFromConfig(file, method, mockaroo_url) {
    var properties = PropertiesReader(file);
    var responses = JSON.parse(properties.get('responses.all'));
    if (!responses.includes(method))
        throw "El metodo no esta definido en el archivo de propiedades"

    var objeto = {};
    var code = JSON.parse(properties.get(`${method}.code`));
    objeto['status'] = code;
    if (code === 400) {
        objeto['message'] = JSON.parse(properties.get(`${method}.error-message`));
        return new Promise(function(resolve, reject) {
            resolve(objeto);
        })
    }
    var _count = JSON.parse(properties.get(`${method}.count`));
    var _model = JSON.parse(properties.get(`${method}.model`));
    var model = getModelFromModles(_model, file);
    var options = {
        method: "POST",
        url: mockaroo_url,
        qs: { count: _count },
        body: model,
        json: true
    };
    return new Promise(function(resolve, reject) {
        request(options, (err, res, body) => {
            objeto['body'] = body;
            resolve(objeto)
        })
    })
};

function getSpecificRespons(file, method, mockaroo_url, id) {
    var properties = PropertiesReader(file);
    var responses = JSON.parse(properties.get('responses.all'));
    if (!responses.includes(method)) {
        return new Promise(function(resolve, reject) {
            reject(new Error("El metodo no esta definido en el archivo de propiedades"));
        })
    }
    var ids = JSON.parse(properties.get(`${method}.ids`));
    if (!ids.includes(id))
        return new Promise(function(resolve, reject) {
            reject(new Error(`El id ${id} no se encuentra en el archivo de propiedades`));
        })
    var objeto = {};
    var code = JSON.parse(properties.get(`${method}.${id}.code`));
    objeto['status'] = code;
    if (code === 400) {
        objeto['message'] = JSON.parse(properties.get(`${method}.${id}.error-message`));
        return new Promise(function(resolve, reject) {
            resolve(objeto);
        })
    }
    var _count = JSON.parse(properties.get(`${method}.${id}.count`));
    var _model = JSON.parse(properties.get(`${method}.${id}.model`));
    var model = getModelFromModles(_model, file);
    var options = {
        method: "POST",
        url: mockaroo_url,
        qs: { count: _count },
        body: model,
        json: true
    };
    return new Promise(function(resolve, reject) {
        request(options, (err, res, body) => {
            objeto['body'] = body;
            resolve(objeto)
        })
    })
};

exports.getResponsFromConfig = getResponsFromConfig;
exports.getSpecificRespons = getSpecificRespons;